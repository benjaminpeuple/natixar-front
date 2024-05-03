export type Tree<T> = {
  parent?: Tree<T>
  value: T
  children: Tree<T>[]
}

export type IdTreeNode = Tree<number>

export type IndexOf<T> = Record<number, T>
