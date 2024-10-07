import { GetBusinesses } from "@/lib/app/user/services";
import { TabsContent } from "@/components/ui/tabs";
import VendorCard from "@/app/(root)/marketplace/_components/vendorCard";

function VirtualMarketPlace({ data }: { data: GetBusinesses[] }) {
  return (
    <TabsContent value="tab-virtual" className="container">
      <div className="flex- w-full">
        <div className="grid w-full grid-cols-2 gap-x-4 gap-y-4 px-[1.5px] sm:px-2 md:grid-cols-3  lg:grid-cols-4 lg:px-0 xlg:grid-cols-4 ">
          {data?.map((item) => {
            return (
              <VendorCard
                varient="default"
                key={Math.random() * Math.PI}
                id={item._id}
                address={item?.address}
                business_profile_picture={item?.business_profile_picture}
                categories={item?.categories}
                description={item?.description}
                location={item?.location}
                name={item?.name}
                total_ratings={item?.total_ratings}
                total_reviews={item?.total_reviews}
                average_rating={item?.average_rating}
                minutes_away={item?.minutes_away}
                vendorId={item?._id}
                hideLocation
                type="customers"
                businessType={item?.productType}
                path={`/dashboard/customers/marketplace/vendor/${item._id}/${item?.business_type}`}
              />
            );
          })}
        </div>
      </div>
    </TabsContent>
  );
}

export default VirtualMarketPlace;
