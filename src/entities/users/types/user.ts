interface Address {
	street: string,
	suite: string,
	city: string,
	zipcode: string | number,
	geo: {
	  lat: string | number,
	  lng: string | number
	}
}

interface Company {
	name: string,
	catchPhrase: string,
	bs: string
}

interface UserData {
    id: number,
    name: string,
    username: string,
    email: string,
    address: Address,
	phone: string,
	website: string,
	company: Company
}

export type { UserData };
