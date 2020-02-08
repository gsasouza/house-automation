export type TableHeader = {
  label: string;
};

export type TableColumn = {
  header: TableHeader;
  property: string;
};

export interface TableProps {
  columns: TableColumn[];
}
