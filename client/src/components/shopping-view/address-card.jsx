

import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId
}) {
  return (
    <Card
      onClick={() =>
        setCurrentSelectedAddress
          ? setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer border ${
        selectedId?._id === addressInfo?._id
          ? 'border-red-700 sm:border-red-900 sm:border-[4px]'
          : 'border-gray-300 sm:border-black'
      }`}
    >
      <CardContent
        className={`${
          selectedId?._id === addressInfo?._id ? 'border-black' : ''
        } grid gap-2 sm:gap-4 p-3 sm:p-4`}
      >
        <Label className="text-sm sm:text-base">Address: {addressInfo?.address}</Label>
        <Label className="text-sm sm:text-base">City: {addressInfo?.city}</Label>
        <Label className="text-sm sm:text-base">Pincode: {addressInfo?.pincode}</Label>
        <Label className="text-sm sm:text-base">Phone: {addressInfo?.phone}</Label>
        <Label className="text-sm sm:text-base">Notes: {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between p-2 sm:p-3 gap-2 sm:gap-0">
        <Button
          size="sm"
          className="w-full sm:w-auto"
          onClick={() => handleEditAddress(addressInfo)}
        >
          Edit
        </Button>
        <Button
          size="sm"
          variant="destructive"
          className="w-full sm:w-auto"
          onClick={() => handleDeleteAddress(addressInfo)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
