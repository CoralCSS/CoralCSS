//! Trie data structure for fast prefix-based pattern matching
//!
//! Used by the Matcher to quickly find utility patterns based on class prefixes.
//! Provides O(k) lookup where k is the length of the prefix.

use ahash::AHashMap;
use std::collections::VecDeque;

/// A node in the prefix trie
#[derive(Debug, Clone)]
pub struct TrieNode<T: Clone> {
    /// Children nodes indexed by character
    children: AHashMap<char, Box<TrieNode<T>>>,

    /// Value stored at this node (if this is a terminal node)
    value: Option<T>,

    /// Whether this node represents a complete prefix
    is_terminal: bool,
}

impl<T: Clone> Default for TrieNode<T> {
    fn default() -> Self {
        Self::new()
    }
}

impl<T: Clone> TrieNode<T> {
    /// Create a new empty trie node
    pub fn new() -> Self {
        Self {
            children: AHashMap::new(),
            value: None,
            is_terminal: false,
        }
    }

    /// Check if this node has any children
    #[inline]
    pub fn has_children(&self) -> bool {
        !self.children.is_empty()
    }

    /// Get the number of children
    #[inline]
    pub fn children_count(&self) -> usize {
        self.children.len()
    }
}

/// High-performance prefix trie for utility pattern matching
#[derive(Debug, Clone)]
pub struct PrefixTrie<T: Clone> {
    root: TrieNode<T>,
    size: usize,
}

impl<T: Clone> Default for PrefixTrie<T> {
    fn default() -> Self {
        Self::new()
    }
}

impl<T: Clone> PrefixTrie<T> {
    /// Create a new empty trie
    pub fn new() -> Self {
        Self {
            root: TrieNode::new(),
            size: 0,
        }
    }

    /// Insert a key-value pair into the trie
    pub fn insert(&mut self, key: &str, value: T) {
        let mut current = &mut self.root;

        for ch in key.chars() {
            current = current
                .children
                .entry(ch)
                .or_insert_with(|| Box::new(TrieNode::new()));
        }

        if !current.is_terminal {
            self.size += 1;
        }

        current.is_terminal = true;
        current.value = Some(value);
    }

    /// Look up an exact key in the trie
    pub fn get(&self, key: &str) -> Option<&T> {
        let mut current = &self.root;

        for ch in key.chars() {
            match current.children.get(&ch) {
                Some(node) => current = node,
                None => return None,
            }
        }

        if current.is_terminal {
            current.value.as_ref()
        } else {
            None
        }
    }

    /// Find the longest matching prefix for the given input
    /// Returns the value and the length of the matched prefix
    pub fn longest_prefix_match(&self, input: &str) -> Option<(&T, usize)> {
        let mut current = &self.root;
        let mut last_match: Option<(&T, usize)> = None;

        for (i, ch) in input.chars().enumerate() {
            match current.children.get(&ch) {
                Some(node) => {
                    current = node;
                    if current.is_terminal {
                        if let Some(ref value) = current.value {
                            last_match = Some((value, i + 1));
                        }
                    }
                }
                None => break,
            }
        }

        last_match
    }

    /// Find all prefixes that match the start of the input
    /// Returns all matching values with their prefix lengths
    pub fn all_prefix_matches(&self, input: &str) -> Vec<(&T, usize)> {
        let mut current = &self.root;
        let mut matches = Vec::new();

        for (i, ch) in input.chars().enumerate() {
            match current.children.get(&ch) {
                Some(node) => {
                    current = node;
                    if current.is_terminal {
                        if let Some(ref value) = current.value {
                            matches.push((value, i + 1));
                        }
                    }
                }
                None => break,
            }
        }

        matches
    }

    /// Check if a key exists in the trie
    #[inline]
    pub fn contains(&self, key: &str) -> bool {
        self.get(key).is_some()
    }

    /// Get the number of keys in the trie
    #[inline]
    pub fn len(&self) -> usize {
        self.size
    }

    /// Check if the trie is empty
    #[inline]
    pub fn is_empty(&self) -> bool {
        self.size == 0
    }

    /// Remove a key from the trie
    /// Returns the value if it existed
    pub fn remove(&mut self, key: &str) -> Option<T> {
        let chars: Vec<char> = key.chars().collect();

        // Navigate to the node
        let mut current = &mut self.root;
        for &ch in &chars {
            if !current.children.contains_key(&ch) {
                return None;
            }
            current = current.children.get_mut(&ch).unwrap();
        }

        // Remove the value if terminal
        if current.is_terminal {
            current.is_terminal = false;
            self.size -= 1;
            return current.value.take();
        }

        None
    }

    /// Get all keys in the trie
    pub fn keys(&self) -> Vec<String> {
        let mut keys = Vec::new();
        let mut stack: VecDeque<(&TrieNode<T>, String)> = VecDeque::new();
        stack.push_back((&self.root, String::new()));

        while let Some((node, prefix)) = stack.pop_front() {
            if node.is_terminal {
                keys.push(prefix.clone());
            }

            for (ch, child) in &node.children {
                let mut new_prefix = prefix.clone();
                new_prefix.push(*ch);
                stack.push_back((child, new_prefix));
            }
        }

        keys
    }

    /// Find all keys with a given prefix
    pub fn keys_with_prefix(&self, prefix: &str) -> Vec<String> {
        let mut current = &self.root;

        // Navigate to the prefix node
        for ch in prefix.chars() {
            match current.children.get(&ch) {
                Some(node) => current = node,
                None => return Vec::new(),
            }
        }

        // Collect all keys from this node
        let mut keys = Vec::new();
        let mut stack: VecDeque<(&TrieNode<T>, String)> = VecDeque::new();
        stack.push_back((current, prefix.to_string()));

        while let Some((node, key)) = stack.pop_front() {
            if node.is_terminal {
                keys.push(key.clone());
            }

            for (ch, child) in &node.children {
                let mut new_key = key.clone();
                new_key.push(*ch);
                stack.push_back((child, new_key));
            }
        }

        keys
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_insert_and_get() {
        let mut trie: PrefixTrie<i32> = PrefixTrie::new();
        trie.insert("p-", 1);
        trie.insert("pt-", 2);
        trie.insert("pb-", 3);

        assert_eq!(trie.get("p-"), Some(&1));
        assert_eq!(trie.get("pt-"), Some(&2));
        assert_eq!(trie.get("pb-"), Some(&3));
        assert_eq!(trie.get("px-"), None);
    }

    #[test]
    fn test_longest_prefix_match() {
        let mut trie: PrefixTrie<&str> = PrefixTrie::new();
        trie.insert("bg-", "background");
        trie.insert("bg-gradient-", "gradient");
        trie.insert("bg-gradient-to-", "gradient-direction");

        let result = trie.longest_prefix_match("bg-gradient-to-r");
        assert_eq!(result, Some((&"gradient-direction", 15)));

        let result = trie.longest_prefix_match("bg-red-500");
        assert_eq!(result, Some((&"background", 3)));
    }

    #[test]
    fn test_all_prefix_matches() {
        let mut trie: PrefixTrie<&str> = PrefixTrie::new();
        trie.insert("b", "b");
        trie.insert("bg", "bg");
        trie.insert("bg-", "background");

        let matches = trie.all_prefix_matches("bg-red");
        assert_eq!(matches.len(), 3);
    }

    #[test]
    fn test_remove() {
        let mut trie: PrefixTrie<i32> = PrefixTrie::new();
        trie.insert("test", 1);
        trie.insert("testing", 2);

        assert_eq!(trie.len(), 2);
        assert_eq!(trie.remove("test"), Some(1));
        assert_eq!(trie.len(), 1);
        assert_eq!(trie.get("test"), None);
        assert_eq!(trie.get("testing"), Some(&2));
    }

    #[test]
    fn test_keys() {
        let mut trie: PrefixTrie<i32> = PrefixTrie::new();
        trie.insert("p-", 1);
        trie.insert("m-", 2);
        trie.insert("bg-", 3);

        let keys = trie.keys();
        assert_eq!(keys.len(), 3);
        assert!(keys.contains(&"p-".to_string()));
        assert!(keys.contains(&"m-".to_string()));
        assert!(keys.contains(&"bg-".to_string()));
    }

    #[test]
    fn test_keys_with_prefix() {
        let mut trie: PrefixTrie<i32> = PrefixTrie::new();
        trie.insert("border-", 1);
        trie.insert("border-t-", 2);
        trie.insert("border-b-", 3);
        trie.insert("bg-", 4);

        let keys = trie.keys_with_prefix("border-");
        assert_eq!(keys.len(), 3);
        assert!(keys.contains(&"border-".to_string()));
        assert!(keys.contains(&"border-t-".to_string()));
        assert!(keys.contains(&"border-b-".to_string()));
    }
}
