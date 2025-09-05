import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import { CardSkeleton, LatestInvoicesSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<LatestInvoicesSkeleton />}>
      <LatestInvoices />
    </Suspense>
  )
}