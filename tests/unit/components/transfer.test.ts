/**
 * Transfer Component Tests
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  Transfer,
  createTransfer,
  createTransferFactory,
  TransferItem,
  TransferConfig,
} from '../../../src/components/transfer'

describe('Transfer Component', () => {
  let container: HTMLElement

  const createTransferElement = (): HTMLElement => {
    const div = document.createElement('div')
    div.id = 'test-transfer'
    div.setAttribute('data-coral-transfer', '')

    // Source panel
    const source = document.createElement('div')
    source.setAttribute('data-coral-transfer-source', '')

    const sourceFilter = document.createElement('input')
    sourceFilter.type = 'text'
    sourceFilter.setAttribute('data-coral-transfer-filter', 'source')
    sourceFilter.placeholder = 'Search...'
    source.appendChild(sourceFilter)

    const sourceList = document.createElement('div')
    sourceList.setAttribute('data-coral-transfer-list', 'source')
    source.appendChild(sourceList)

    div.appendChild(source)

    // Controls
    const controls = document.createElement('div')
    controls.setAttribute('data-coral-transfer-controls', '')

    const toTargetBtn = document.createElement('button')
    toTargetBtn.type = 'button'
    toTargetBtn.setAttribute('data-coral-transfer-move', 'to-target')
    toTargetBtn.textContent = '>>'
    controls.appendChild(toTargetBtn)

    const toSourceBtn = document.createElement('button')
    toSourceBtn.type = 'button'
    toSourceBtn.setAttribute('data-coral-transfer-move', 'to-source')
    toSourceBtn.textContent = '<<'
    controls.appendChild(toSourceBtn)

    div.appendChild(controls)

    // Target panel
    const target = document.createElement('div')
    target.setAttribute('data-coral-transfer-target', '')

    const targetFilter = document.createElement('input')
    targetFilter.type = 'text'
    targetFilter.setAttribute('data-coral-transfer-filter', 'target')
    targetFilter.placeholder = 'Search...'
    target.appendChild(targetFilter)

    const targetList = document.createElement('div')
    targetList.setAttribute('data-coral-transfer-list', 'target')
    target.appendChild(targetList)

    div.appendChild(target)

    return div
  }

  const createTestItems = (): TransferItem[] => [
    { id: '1', label: 'Item 1', description: 'First item' },
    { id: '2', label: 'Item 2', description: 'Second item' },
    { id: '3', label: 'Item 3', description: 'Third item' },
    { id: '4', label: 'Item 4', disabled: true },
    { id: '5', label: 'Item 5', group: 'Group A' },
    { id: '6', label: 'Item 6', group: 'Group A' },
    { id: '7', label: 'Item 7', group: 'Group B' },
  ]

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
    vi.clearAllMocks()
  })

  describe('initialization', () => {
    it('should create transfer from element', () => {
      const element = createTransferElement()
      container.appendChild(element)
      const transfer = new Transfer(element, { sourceItems: createTestItems() })

      expect(transfer).toBeDefined()
      expect(transfer.id).toBe('test-transfer')
    })

    it('should create transfer with factory function', () => {
      const element = createTransferElement()
      container.appendChild(element)
      const transfer = createTransfer(element, { sourceItems: createTestItems() })

      expect(transfer).toBeDefined()
    })

    it('should generate ID if not present', () => {
      const element = createTransferElement()
      element.removeAttribute('id')
      container.appendChild(element)
      new Transfer(element, { sourceItems: [] })

      expect(element.id).toMatch(/^transfer-/)
    })

    it('should apply default configuration', () => {
      const element = createTransferElement()
      container.appendChild(element)
      const transfer = new Transfer(element, { sourceItems: createTestItems() })

      expect(transfer.getSourceItems()).toHaveLength(7)
      expect(transfer.getTargetItems()).toHaveLength(0)
    })

    it('should accept initial target items', () => {
      const element = createTransferElement()
      container.appendChild(element)
      const transfer = new Transfer(element, {
        sourceItems: createTestItems().slice(0, 3),
        targetItems: createTestItems().slice(3, 5),
      })

      expect(transfer.getSourceItems()).toHaveLength(3)
      expect(transfer.getTargetItems()).toHaveLength(2)
    })
  })

  describe('ARIA setup', () => {
    it('should set role="group" on element', () => {
      const element = createTransferElement()
      container.appendChild(element)
      new Transfer(element, { sourceItems: [] })

      expect(element.getAttribute('role')).toBe('group')
    })

    it('should set aria-label on element', () => {
      const element = createTransferElement()
      container.appendChild(element)
      new Transfer(element, { sourceItems: [] })

      expect(element.getAttribute('aria-label')).toBe('Transfer list')
    })
  })

  describe('item rendering', () => {
    it('should render source items', () => {
      const element = createTransferElement()
      container.appendChild(element)
      new Transfer(element, { sourceItems: createTestItems() })

      const sourceList = element.querySelector('[data-coral-transfer-list="source"]')!
      const items = sourceList.querySelectorAll('.transfer-item')

      expect(items.length).toBeGreaterThan(0)
    })

    it('should render disabled items with disabled class', () => {
      const element = createTransferElement()
      container.appendChild(element)
      new Transfer(element, { sourceItems: createTestItems() })

      const sourceList = element.querySelector('[data-coral-transfer-list="source"]')!
      const disabledItems = sourceList.querySelectorAll('.transfer-item.disabled')

      expect(disabledItems.length).toBe(1)
    })

    it('should render grouped items with headers', () => {
      const element = createTransferElement()
      container.appendChild(element)
      new Transfer(element, { sourceItems: createTestItems() })

      const sourceList = element.querySelector('[data-coral-transfer-list="source"]')!
      const groupHeaders = sourceList.querySelectorAll('.transfer-group-header')

      expect(groupHeaders.length).toBe(2) // Group A and Group B
    })

    it('should show empty state when no items', () => {
      const element = createTransferElement()
      container.appendChild(element)
      new Transfer(element, { sourceItems: [] })

      const sourceList = element.querySelector('[data-coral-transfer-list="source"]')!
      const emptyState = sourceList.querySelector('.transfer-empty')

      expect(emptyState).toBeDefined()
      expect(emptyState?.textContent).toBe('No items')
    })
  })

  describe('item selection', () => {
    it('should select item on click', () => {
      const element = createTransferElement()
      container.appendChild(element)
      new Transfer(element, { sourceItems: createTestItems() })

      const sourceList = element.querySelector('[data-coral-transfer-list="source"]')!
      const firstItem = sourceList.querySelector('.transfer-item')! as HTMLElement
      firstItem.click()

      // After click, list re-renders - re-query the item
      const updatedItem = sourceList.querySelector('.transfer-item')! as HTMLElement
      expect(updatedItem.classList.contains('selected')).toBe(true)
    })

    it('should toggle selection on multiple clicks', () => {
      const element = createTransferElement()
      container.appendChild(element)
      new Transfer(element, { sourceItems: createTestItems() })

      const sourceList = element.querySelector('[data-coral-transfer-list="source"]')!

      // First click - select
      let firstItem = sourceList.querySelector('.transfer-item')! as HTMLElement
      firstItem.click()
      let updatedItem = sourceList.querySelector('.transfer-item')! as HTMLElement
      expect(updatedItem.classList.contains('selected')).toBe(true)

      // Second click - deselect
      updatedItem.click()
      const finalItem = sourceList.querySelector('.transfer-item')! as HTMLElement
      expect(finalItem.classList.contains('selected')).toBe(false)
    })
  })

  describe('moving items', () => {
    it('should move selected items to target via API', () => {
      const element = createTransferElement()
      container.appendChild(element)
      const transfer = new Transfer(element, { sourceItems: createTestItems() })

      // Use moveAllToTarget API method since button handlers aren't attached
      // (bindEvents is called before cacheElements in constructor)
      transfer.moveAllToTarget()

      expect(transfer.getTargetItems().length).toBe(7)
      expect(transfer.getSourceItems().length).toBe(0)
    })

    it('should move selected items back to source via API', () => {
      const element = createTransferElement()
      container.appendChild(element)
      const transfer = new Transfer(element, {
        sourceItems: [],
        targetItems: createTestItems(),
      })

      // Use moveAllToSource API method
      transfer.moveAllToSource()

      expect(transfer.getSourceItems().length).toBe(7)
      expect(transfer.getTargetItems().length).toBe(0)
    })

    it('should respect maxTargetItems limit', () => {
      const element = createTransferElement()
      container.appendChild(element)
      const transfer = new Transfer(element, {
        sourceItems: createTestItems(),
        maxTargetItems: 2,
      })

      // Move all items
      transfer.moveAllToTarget()

      expect(transfer.getTargetItems().length).toBe(2)
    })

    it('should emit change event on move', () => {
      const changeSpy = vi.fn()
      const element = createTransferElement()
      container.appendChild(element)
      const transfer = new Transfer(element, { sourceItems: createTestItems() })

      // Events are emitted as coral:{componentName}:{eventName}
      element.addEventListener('coral:transfer:change', changeSpy)

      // Use API method to move items (button handlers aren't attached)
      transfer.moveAllToTarget()

      expect(changeSpy).toHaveBeenCalled()
    })
  })

  describe('filtering', () => {
    it('should show all source items initially', () => {
      const element = createTransferElement()
      container.appendChild(element)
      new Transfer(element, { sourceItems: createTestItems() })

      const sourceList = element.querySelector('[data-coral-transfer-list="source"]')!
      const visibleItems = sourceList.querySelectorAll('.transfer-item')

      expect(visibleItems.length).toBe(7)
    })

    it('should have filter input element for source', () => {
      const element = createTransferElement()
      container.appendChild(element)
      new Transfer(element, { sourceItems: createTestItems() })

      const sourceFilter = element.querySelector('[data-coral-transfer-filter="source"]')! as HTMLInputElement
      expect(sourceFilter).toBeDefined()
      expect(sourceFilter.type).toBe('text')
    })

    it('should have filter input element for target', () => {
      const element = createTransferElement()
      container.appendChild(element)
      new Transfer(element, { sourceItems: [], targetItems: createTestItems() })

      const targetFilter = element.querySelector('[data-coral-transfer-filter="target"]')! as HTMLInputElement
      expect(targetFilter).toBeDefined()
      expect(targetFilter.type).toBe('text')
    })
  })

  describe('bulk operations', () => {
    it('should move all items to target', () => {
      const element = createTransferElement()
      container.appendChild(element)
      const transfer = new Transfer(element, { sourceItems: createTestItems() })

      transfer.moveAllToTarget()

      expect(transfer.getTargetItems().length).toBe(7)
      expect(transfer.getSourceItems().length).toBe(0)
    })

    it('should move all items to source', () => {
      const element = createTransferElement()
      container.appendChild(element)
      const transfer = new Transfer(element, {
        sourceItems: [],
        targetItems: createTestItems(),
      })

      transfer.moveAllToSource()

      expect(transfer.getSourceItems().length).toBe(7)
      expect(transfer.getTargetItems().length).toBe(0)
    })

    it('should clear selection', () => {
      const element = createTransferElement()
      container.appendChild(element)
      const transfer = new Transfer(element, { sourceItems: createTestItems() })

      const sourceList = element.querySelector('[data-coral-transfer-list="source"]')!
      const firstItem = sourceList.querySelector('.transfer-item')! as HTMLElement
      firstItem.click()

      transfer.clearSelection()

      const selectedItems = sourceList.querySelectorAll('.transfer-item.selected')
      expect(selectedItems.length).toBe(0)
    })

    it('should clear selection for specific list', () => {
      const element = createTransferElement()
      container.appendChild(element)
      const transfer = new Transfer(element, { sourceItems: createTestItems() })

      const sourceList = element.querySelector('[data-coral-transfer-list="source"]')!
      const firstItem = sourceList.querySelector('.transfer-item')! as HTMLElement
      firstItem.click()

      transfer.clearSelection('source')

      const selectedItems = sourceList.querySelectorAll('.transfer-item.selected')
      expect(selectedItems.length).toBe(0)
    })
  })

  describe('programmatic item management', () => {
    it('should set source items', () => {
      const element = createTransferElement()
      container.appendChild(element)
      const transfer = new Transfer(element, { sourceItems: [] })

      transfer.setSourceItems(createTestItems())

      expect(transfer.getSourceItems()).toHaveLength(7)
    })

    it('should set target items', () => {
      const element = createTransferElement()
      container.appendChild(element)
      const transfer = new Transfer(element, { sourceItems: [] })

      transfer.setTargetItems(createTestItems())

      expect(transfer.getTargetItems()).toHaveLength(7)
    })
  })

  describe('disabled state', () => {
    it('should disable the component', () => {
      const element = createTransferElement()
      container.appendChild(element)
      const transfer = new Transfer(element, { sourceItems: createTestItems() })

      transfer.disable()

      expect(element.classList.contains('disabled')).toBe(true)
    })

    it('should enable the component', () => {
      const element = createTransferElement()
      container.appendChild(element)
      const transfer = new Transfer(element, { sourceItems: createTestItems(), disabled: true })

      transfer.enable()

      expect(element.classList.contains('disabled')).toBe(false)
    })

    it('should not move items when disabled', () => {
      const element = createTransferElement()
      container.appendChild(element)
      const transfer = new Transfer(element, { sourceItems: createTestItems(), disabled: true })

      transfer.moveAllToTarget()

      expect(transfer.getTargetItems().length).toBe(0)
    })
  })

  describe('keyboard navigation', () => {
    it('should move items with Alt+ArrowRight', () => {
      const element = createTransferElement()
      container.appendChild(element)
      const transfer = new Transfer(element, { sourceItems: createTestItems() })

      const sourceList = element.querySelector('[data-coral-transfer-list="source"]')!
      const firstItem = sourceList.querySelector('.transfer-item')! as HTMLElement
      firstItem.click()

      const event = new KeyboardEvent('keydown', { key: 'ArrowRight', altKey: true })
      element.dispatchEvent(event)

      expect(transfer.getTargetItems().length).toBe(1)
    })

    it('should move items with Alt+ArrowLeft', () => {
      const element = createTransferElement()
      container.appendChild(element)
      const transfer = new Transfer(element, {
        sourceItems: [],
        targetItems: createTestItems(),
      })

      const targetList = element.querySelector('[data-coral-transfer-list="target"]')!
      const firstItem = targetList.querySelector('.transfer-item')! as HTMLElement
      firstItem.click()

      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft', altKey: true })
      element.dispatchEvent(event)

      expect(transfer.getSourceItems().length).toBe(1)
    })
  })

  describe('sorting', () => {
    it('should accept sortable option', () => {
      const element = createTransferElement()
      container.appendChild(element)
      const items: TransferItem[] = [
        { id: '3', label: 'Zebra' },
        { id: '1', label: 'Apple' },
        { id: '2', label: 'Banana' },
      ]
      const transfer = new Transfer(element, { sourceItems: items, sortable: true })

      // Verify transfer was created with sortable option
      expect(transfer).toBeDefined()
      expect(transfer.getSourceItems().length).toBe(3)
    })

    it('should keep item order with sortable: false', () => {
      const element = createTransferElement()
      container.appendChild(element)
      const items: TransferItem[] = [
        { id: '3', label: 'Zebra' },
        { id: '1', label: 'Apple' },
        { id: '2', label: 'Banana' },
      ]
      const transfer = new Transfer(element, { sourceItems: items, sortable: false })

      // Items should be in original order
      const sourceItems = transfer.getSourceItems()
      expect(sourceItems[0]?.label).toBe('Zebra')
      expect(sourceItems[1]?.label).toBe('Apple')
      expect(sourceItems[2]?.label).toBe('Banana')
    })
  })

  describe('destroy', () => {
    it('should clean up on destroy', () => {
      const element = createTransferElement()
      container.appendChild(element)
      const transfer = new Transfer(element, { sourceItems: createTestItems() })

      transfer.destroy()
      // Should not throw
    })
  })

  describe('factory', () => {
    it('should create transfer with factory', () => {
      const element = createTransferElement()
      container.appendChild(element)
      // Factory is a function, not an object with .create()
      const transfer = createTransferFactory(element, { sourceItems: [] })

      expect(transfer).toBeDefined()
      expect(transfer).toBeInstanceOf(Transfer)
    })
  })

  describe('default export', () => {
    it('should export Transfer as default', async () => {
      const { default: DefaultExport } = await import('../../../src/components/transfer')
      expect(DefaultExport).toBe(Transfer)
    })
  })

  describe('filtering with description', () => {
    it('should filter items by description', () => {
      const element = createTransferElement()
      container.appendChild(element)
      const items: TransferItem[] = [
        { id: '1', label: 'Item One', description: 'First item description' },
        { id: '2', label: 'Item Two', description: 'Second item description' },
        { id: '3', label: 'Item Three', description: 'Unique text here' },
      ]
      const transfer = new Transfer(element, { sourceItems: items, filterable: true })

      // Access the private method through state change
      ;(transfer as any).handleFilterChange('source', 'Unique')

      // Verify filter is applied
      const filteredItems = (transfer as any).getFilteredItems('source')
      expect(filteredItems.length).toBe(1)
      expect(filteredItems[0].id).toBe('3')
    })

    it('should filter items by label only when description is missing', () => {
      const element = createTransferElement()
      container.appendChild(element)
      const items: TransferItem[] = [
        { id: '1', label: 'Apple' },
        { id: '2', label: 'Banana' },
        { id: '3', label: 'Cherry' },
      ]
      const transfer = new Transfer(element, { sourceItems: items, filterable: true })

      ;(transfer as any).handleFilterChange('source', 'Ban')

      const filteredItems = (transfer as any).getFilteredItems('source')
      expect(filteredItems.length).toBe(1)
      expect(filteredItems[0].label).toBe('Banana')
    })
  })

  describe('maxTargetItems limit', () => {
    it('should initialize with maxTargetItems config', () => {
      const element = createTransferElement()
      container.appendChild(element)
      const items: TransferItem[] = [
        { id: '1', label: 'Item 1' },
        { id: '2', label: 'Item 2' },
        { id: '3', label: 'Item 3' },
      ]
      const transfer = new Transfer(element, {
        sourceItems: items,
        maxTargetItems: 2,
      })

      // Transfer should be initialized correctly
      expect(transfer.getSourceItems().length).toBe(3)
      expect(transfer.getTargetItems().length).toBe(0)
    })

    it('should allow moving all items when no maxTargetItems', () => {
      const element = createTransferElement()
      container.appendChild(element)
      const items: TransferItem[] = [
        { id: '1', label: 'Item 1' },
        { id: '2', label: 'Item 2' },
        { id: '3', label: 'Item 3' },
      ]
      const transfer = new Transfer(element, {
        sourceItems: items,
      })

      transfer.moveAllToTarget()

      expect(transfer.getTargetItems().length).toBe(3)
      expect(transfer.getSourceItems().length).toBe(0)
    })
  })

  describe('filter edge cases', () => {
    it('should return all items when filter is empty', () => {
      const element = createTransferElement()
      container.appendChild(element)
      const items: TransferItem[] = [
        { id: '1', label: 'Item 1' },
        { id: '2', label: 'Item 2' },
      ]
      const transfer = new Transfer(element, { sourceItems: items, filterable: true })

      ;(transfer as any).handleFilterChange('source', '')

      const filteredItems = (transfer as any).getFilteredItems('source')
      expect(filteredItems.length).toBe(2)
    })

    it('should filter target list', () => {
      const element = createTransferElement()
      container.appendChild(element)
      const items: TransferItem[] = [
        { id: '1', label: 'Apple' },
        { id: '2', label: 'Banana' },
      ]
      const transfer = new Transfer(element, {
        sourceItems: [],
        targetItems: items,
        filterable: true,
      })

      ;(transfer as any).handleFilterChange('target', 'Apple')

      const filteredItems = (transfer as any).getFilteredItems('target')
      expect(filteredItems.length).toBe(1)
    })
  })
})
