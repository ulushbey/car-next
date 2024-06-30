import { PropertyFuel, PropertyLocation, PropertyStatus, PropertyType } from '../../enums/property.enum';

export interface PropertyUpdate {
	_id: string;
	propertyType?: PropertyType;
	propertyStatus?: PropertyStatus;
	propertyLocation?: PropertyLocation;
	propertyFuel?: PropertyFuel;
	propertyAddress?: string;
	propertyTitle?: string;
	propertyPrice?: number;
	propertyColor?: string;
	propertyYear?: number;
	propertyMileage?: number;
	propertyCountry?: string;
	propertyImages?: string[];
	propertyDesc?: string;
	propertyBarter?: boolean;
	propertyRent?: boolean;
	soldAt?: Date;
	deletedAt?: Date;
	manufacturedAt?: Date;
}
