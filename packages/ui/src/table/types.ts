export type TableHeader = {
  label: string;
};

export type TableColumn = {
  header: TableHeader;
  property: string;
};

type Edge<T> = {
  cursor: string;
  node: T;
};

export interface TableProps<T> {
  columns: TableColumn[];
  data: {
    count: number;
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      endCursor: string;
      startCursor: string;
    };
    edges: Edge<T>[];
  };
  onRowClick?: (node: T) => void;
}
