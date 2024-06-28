

export function isRepeatedAddress(address: Array<{ street: string, city: string, country: string}>){
  for (let i = 0; i < address.length - 1; i++) {
    // Check if the current address is the same as the next one
    if (address[i].street === address[i + 1].street &&
        address[i].city === address[i + 1].city &&
        address[i].country === address[i + 1].country) {
      return true; 
    }
  }
  return false; 
}


export function isEmpty(array: any[]): boolean {
  return Array.isArray(array) && array.length === 0;
}