import {
	PropertyFuel,
	PropertyLocation,
	PropertyOption,
	PropertyStatus,
	PropertyTransmission,
	PropertyType,
} from '../../enums/property.enum';
import { Direction } from '../../enums/common.enum';

export interface PropertyInput {
	propertyType: PropertyType;
	propertyLocation: PropertyLocation;
	propertyTransmission: PropertyTransmission;
	propertyFuel: PropertyFuel;
	propertyAddress: string;
	propertyTitle: string;
	propertyPrice: number;
	propertyCountry: string;
	propertyManufacture: string;
	propertyModel: string;
	propertyColor: string;
	propertyMileage: number;
	propertyImages: string[];
	propertyDrivenDistance: number;
	propertyYear: number;
	propertyDesc?: string;
	propertyBarter?: boolean;
	propertyRent?: boolean;
	propertyOption: PropertyOption[];
	memberId?: string;
	manufacturedAt?: Date;
}

interface PISearch {
	memberId?: string;
	locationList?: PropertyLocation[];
	typeList?: PropertyType[];
	typeFuel?: PropertyFuel[];
	typeTransmission?: PropertyTransmission[];
	options?: string[];
	pricesRange?: Range;
	periodsRange?: PeriodsRange;
	text?: string;
}

export interface PropertiesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: PISearch;
}

interface APISearch {
	propertyStatus?: PropertyStatus;
}

export interface AgentPropertiesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: APISearch;
}

interface ALPISearch {
	propertyStatus?: PropertyStatus;
	propertyLocationList?: PropertyLocation[];
}

export interface AllPropertiesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: ALPISearch;
}

interface Range {
	start: number;
	end: number;
}

interface PeriodsRange {
	start: Date | number;
	end: Date | number;
}
