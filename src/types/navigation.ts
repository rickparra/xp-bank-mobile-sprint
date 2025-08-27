// Navigation LinkedList Node
export interface NavigationNode {
  screenName: string;
  params?: any;
  timestamp: number;
  next?: NavigationNode;
  previous?: NavigationNode;
}

// Navigation History Manager
export class NavigationHistory {
  private head: NavigationNode | null = null;
  private current: NavigationNode | null = null;
  private maxHistory: number = 10;

  // Add new screen to history
  push(screenName: string, params?: any): void {
    const newNode: NavigationNode = {
      screenName,
      params,
      timestamp: Date.now(),
      next: null,
      previous: this.current
    };

    if (this.current) {
      this.current.next = newNode;
    }

    if (!this.head) {
      this.head = newNode;
    }

    this.current = newNode;

    // Keep only max history items
    this.trimHistory();
  }

  // Go back to previous screen
  pop(): NavigationNode | null {
    if (!this.current || !this.current.previous) {
      return null;
    }

    const previousNode = this.current.previous;
    
    // Remove current node from the chain
    if (this.current.next) {
      this.current.next.previous = this.current.previous;
    }
    
    if (this.current.previous) {
      this.current.previous.next = this.current.next;
    }

    this.current = previousNode;
    
    return previousNode;
  }

  // Get current screen
  getCurrent(): NavigationNode | null {
    return this.current;
  }

  // Check if can go back
  canGoBack(): boolean {
    return this.current !== null && this.current.previous !== null;
  }

  // Get navigation stack as array
  getStack(): NavigationNode[] {
    const stack: NavigationNode[] = [];
    let node = this.head;
    
    while (node) {
      stack.push(node);
      node = node.next;
    }
    
    return stack;
  }

  // Clear all history
  clear(): void {
    this.head = null;
    this.current = null;
  }

  // Trim history to max items
  private trimHistory(): void {
    const stack = this.getStack();
    
    if (stack.length > this.maxHistory) {
      // Remove oldest items
      const itemsToRemove = stack.length - this.maxHistory;
      let node = this.head;
      
      for (let i = 0; i < itemsToRemove && node; i++) {
        const nextNode = node.next;
        if (nextNode) {
          nextNode.previous = null;
          this.head = nextNode;
        }
        node = nextNode;
      }
    }
  }

  // Get breadcrumb path
  getBreadcrumbs(): string[] {
    return this.getStack().map(node => node.screenName);
  }
}

export interface NavigationContextType {
  history: NavigationHistory;
  navigateTo: (screenName: string, params?: any) => void;
  goBack: () => boolean;
  canGoBack: boolean;
  currentScreen: string | null;
  breadcrumbs: string[];
}