import { createColumnHelper } from '@tanstack/react-table';
import { ArrowUpDownIcon } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import RemoveButton from '@/components/admin/dashboard/brands/RemoveButton';
import UpdateButton from '@/components/admin/dashboard/brands/UpdateButton';
import { Brand } from '@/schemas/brands';

const columnHelper = createColumnHelper<Brand>();

export const columns = [
  columnHelper.display({
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
    enableHiding: false,
  }),
  columnHelper.accessor('name', {
    header: ({ column }) => (
      <div className="flex items-center gap-1 cursor-pointer w-fit" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        <span>Nombre</span>
        <ArrowUpDownIcon className="size-4" />
      </div>
    ),
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    id: 'action',
    cell: ({ row }) => (
      <div className="flex gap-2 justify-end">
        <UpdateButton item={row.original} />
        <RemoveButton id={row.original.id} />
      </div>
    ),
    enableHiding: false,
  }),
];
