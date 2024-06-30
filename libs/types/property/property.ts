import {
	PropertyFuel,
	PropertyLocation,
	PropertyOption,
	PropertyStatus,
	PropertyTransmission,
	PropertyType,
} from '../../enums/property.enum';
import { Member } from '../member/member';

export interface MeLiked {
	memberId: string;
	likeRefId: string;
	myFavorite: boolean;
}

export interface TotalCounter {
	total: number;
}

export interface Property {
	_id: string;
	propertyType: PropertyType;
	propertyStatus: PropertyStatus;
	propertyLocation: PropertyLocation;
	propertyFuel: PropertyFuel;
	propertyAddress: string;
	propertyOption: PropertyOption[];
	propertyTransmission: PropertyTransmission;
	propertyTitle: string;
	propertyPrice: number;
	propertyCountry: string;
	propertyManufacture: string;
	propertyModel: string;
	propertyColor: string;
	propertyYear: number;
	propertyMileage: number;
	propertyViews: number;
	propertyLikes: number;
	propertyComments: number;
	propertyRank: number;
	propertyDrivenDistance: number;
	propertyImages: string[];
	propertyDesc?: string;
	propertyBarter: boolean;
	propertyRent: boolean;
	propertyAccident?: number;
	memberId: string;
	soldAt?: Date;
	deletedAt?: Date;
	manufacturedAt?: Date;
	createdAt: Date;
	updatedAt: Date;
	/** from aggregation **/
	meLiked?: MeLiked[];
	memberData?: Member;
}

export interface Properties {
	list: Property[];
	metaCounter: TotalCounter[];
}
