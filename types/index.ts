export interface Asset {
	_ref: string;
	_type: string;
}

export interface Image {
	_key?: string;
	_type: string;
	asset: Asset;
}

export interface Slug {
	_type: string;
	current: string;
}

export interface IProduct {
	_createdAt: Date;
	_id: string;
	_rev: string;
	_type: string;
	_updatedAt: Date;
	details: string;
	image: Image[];
	name: string;
	price: number;
	slug: Slug;
	quantity?: number;
}

export interface IBanner {
	_createdAt: Date;
	_id: string;
	_rev: string;
	_type: string;
	_updatedAt: Date;
	buttonText: string;
	desc: string;
	discount: string;
	image: Image;
	largeText1: string;
	largeText2: string;
	midText: string;
	product: string;
	saleTime: string;
	smallText: string;
}
