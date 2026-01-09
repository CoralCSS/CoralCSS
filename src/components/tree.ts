/**
 * Tree Component
 *
 * Hierarchical tree view with expand/collapse.
 * @module components/tree
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

export interface TreeConfig extends ComponentConfig {
  /** Allow multiple selection */
  multiSelect?: boolean
  /** Show checkboxes */
  checkboxes?: boolean
  /** Default expanded nodes */
  defaultExpanded?: string[]
  /** Default selected nodes */
  defaultSelected?: string[]
}

export interface TreeState extends ComponentState {
  expandedNodes: Set<string>
  selectedNodes: Set<string>
  focusedNode: string | null
}

/**
 * Tree component for hierarchical data
 */
export class Tree extends BaseComponent {
  private nodes: Map<string, HTMLElement> = new Map()

  protected getDefaultConfig(): TreeConfig {
    return {
      multiSelect: false,
      checkboxes: false,
      defaultExpanded: [],
      defaultSelected: [],
    }
  }

  protected getInitialState(): TreeState {
    const config = this.config as TreeConfig
    return {
      expandedNodes: new Set(config.defaultExpanded),
      selectedNodes: new Set(config.defaultSelected),
      focusedNode: null,
    }
  }

  protected setupAria(): void {
    this.element.setAttribute('role', 'tree')

    // Index all nodes
    const items = this.queryAll('[data-coral-tree-item]')
    items.forEach((item) => {
      const nodeId = (item as HTMLElement).dataset.nodeId
      if (nodeId) {
        this.nodes.set(nodeId, item as HTMLElement)
        item.setAttribute('role', 'treeitem')
        item.setAttribute('tabindex', '-1')

        // Check for children
        const hasChildren = item.querySelector('[data-coral-tree-group]') !== null
        if (hasChildren) {
          item.setAttribute('aria-expanded', 'false')
        }
      }
    })

    // Set first node as focusable
    const firstNode = items[0] as HTMLElement
    if (firstNode) {
      firstNode.setAttribute('tabindex', '0')
    }
  }

  protected bindEvents(): void {
    this.nodes.forEach((node, nodeId) => {
      // Click to select
      const handleClick = (e: Event) => {
        e.stopPropagation()
        this.selectNode(nodeId)
        this.focusNode(nodeId)
      }
      this.addEventListener(node, 'click', handleClick)

      // Toggle expand
      const toggle = node.querySelector('[data-coral-tree-toggle]')
      if (toggle) {
        const handleToggle = (e: Event) => {
          e.stopPropagation()
          this.toggleNode(nodeId)
        }
        this.addEventListener(toggle, 'click', handleToggle)
      }

      // Double click to expand
      const handleDblClick = () => {
        this.toggleNode(nodeId)
      }
      this.addEventListener(node, 'dblclick', handleDblClick)
    })

    // Keyboard navigation
    const handleKeydown = (e: Event) => {
      const ke = e as KeyboardEvent
      const state = this.state as TreeState
      const focusedId = state.focusedNode
      if (!focusedId) {return}

      switch (ke.key) {
        case 'ArrowDown':
          e.preventDefault()
          this.focusNextNode(focusedId)
          break
        case 'ArrowUp':
          e.preventDefault()
          this.focusPrevNode(focusedId)
          break
        case 'ArrowRight':
          e.preventDefault()
          if (this.hasChildren(focusedId)) {
            if (!state.expandedNodes.has(focusedId)) {
              this.expandNode(focusedId)
            } else {
              this.focusFirstChild(focusedId)
            }
          }
          break
        case 'ArrowLeft':
          e.preventDefault()
          if (state.expandedNodes.has(focusedId)) {
            this.collapseNode(focusedId)
          } else {
            this.focusParent(focusedId)
          }
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          this.selectNode(focusedId)
          break
        case 'Home':
          e.preventDefault()
          this.focusFirstNode()
          break
        case 'End':
          e.preventDefault()
          this.focusLastNode()
          break
      }
    }
    this.addEventListener(this.element, 'keydown', handleKeydown)
  }

  private hasChildren(nodeId: string): boolean {
    const node = this.nodes.get(nodeId)
    return node?.querySelector('[data-coral-tree-group]') !== null
  }

  private focusNextNode(currentId: string): void {
    const visibleNodes = this.getVisibleNodes()
    const currentIndex = visibleNodes.indexOf(currentId)
    if (currentIndex < visibleNodes.length - 1) {
      this.focusNode(visibleNodes[currentIndex + 1]!)
    }
  }

  private focusPrevNode(currentId: string): void {
    const visibleNodes = this.getVisibleNodes()
    const currentIndex = visibleNodes.indexOf(currentId)
    if (currentIndex > 0) {
      this.focusNode(visibleNodes[currentIndex - 1]!)
    }
  }

  private focusFirstChild(nodeId: string): void {
    const node = this.nodes.get(nodeId)
    const firstChild = node?.querySelector('[data-coral-tree-item]')
    const childId = (firstChild as HTMLElement)?.dataset.nodeId
    if (childId) {
      this.focusNode(childId)
    }
  }

  private focusParent(nodeId: string): void {
    const node = this.nodes.get(nodeId)
    const parent = node?.parentElement?.closest('[data-coral-tree-item]')
    const parentId = (parent as HTMLElement)?.dataset.nodeId
    if (parentId) {
      this.focusNode(parentId)
    }
  }

  private focusFirstNode(): void {
    const visibleNodes = this.getVisibleNodes()
    if (visibleNodes.length > 0) {
      this.focusNode(visibleNodes[0]!)
    }
  }

  private focusLastNode(): void {
    const visibleNodes = this.getVisibleNodes()
    if (visibleNodes.length > 0) {
      this.focusNode(visibleNodes[visibleNodes.length - 1]!)
    }
  }

  private getVisibleNodes(): string[] {
    const state = this.state as TreeState
    const visible: string[] = []

    const traverse = (parent: Element) => {
      const items = parent.querySelectorAll(':scope > [data-coral-tree-item], :scope > [data-coral-tree-group] > [data-coral-tree-item]')
      items.forEach((item) => {
        const nodeId = (item as HTMLElement).dataset.nodeId
        if (nodeId) {
          visible.push(nodeId)
          if (state.expandedNodes.has(nodeId)) {
            const group = item.querySelector('[data-coral-tree-group]')
            if (group) {
              traverse(group)
            }
          }
        }
      })
    }

    traverse(this.element)
    return visible
  }

  protected override render(): void {
    const state = this.state as TreeState

    this.nodes.forEach((node, nodeId) => {
      const isExpanded = state.expandedNodes.has(nodeId)
      const isSelected = state.selectedNodes.has(nodeId)
      const isFocused = state.focusedNode === nodeId

      if (this.hasChildren(nodeId)) {
        node.setAttribute('aria-expanded', String(isExpanded))
        const group = node.querySelector('[data-coral-tree-group]')
        if (group) {
          (group as HTMLElement).hidden = !isExpanded
        }
      }

      node.setAttribute('aria-selected', String(isSelected))
      node.dataset.expanded = String(isExpanded)
      node.dataset.selected = String(isSelected)
      node.setAttribute('tabindex', isFocused ? '0' : '-1')
    })
  }

  expandNode(nodeId: string): void {
    const state = this.state as TreeState
    const newExpanded = new Set(state.expandedNodes)
    newExpanded.add(nodeId)
    this.setState({ expandedNodes: newExpanded })
    this.dispatch('expand', { nodeId })
  }

  collapseNode(nodeId: string): void {
    const state = this.state as TreeState
    const newExpanded = new Set(state.expandedNodes)
    newExpanded.delete(nodeId)
    this.setState({ expandedNodes: newExpanded })
    this.dispatch('collapse', { nodeId })
  }

  toggleNode(nodeId: string): void {
    const state = this.state as TreeState
    if (state.expandedNodes.has(nodeId)) {
      this.collapseNode(nodeId)
    } else {
      this.expandNode(nodeId)
    }
  }

  selectNode(nodeId: string): void {
    const config = this.config as TreeConfig
    const state = this.state as TreeState
    let newSelected: Set<string>

    if (config.multiSelect) {
      newSelected = new Set(state.selectedNodes)
      if (newSelected.has(nodeId)) {
        newSelected.delete(nodeId)
      } else {
        newSelected.add(nodeId)
      }
    } else {
      newSelected = new Set([nodeId])
    }

    this.setState({ selectedNodes: newSelected })
    this.dispatch('select', { nodeId, selectedNodes: Array.from(newSelected) })
  }

  focusNode(nodeId: string): void {
    const node = this.nodes.get(nodeId)
    if (node) {
      this.setState({ focusedNode: nodeId })
      node.focus()
    }
  }

  getSelectedNodes(): string[] {
    return Array.from((this.state as TreeState).selectedNodes)
  }

  getExpandedNodes(): string[] {
    return Array.from((this.state as TreeState).expandedNodes)
  }

  expandAll(): void {
    const allNodeIds = Array.from(this.nodes.keys())
    this.setState({ expandedNodes: new Set(allNodeIds) })
  }

  collapseAll(): void {
    this.setState({ expandedNodes: new Set() })
  }
}

export const createTree = createComponentFactory(Tree)
export default Tree
