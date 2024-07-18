import { ObjectId } from 'mongoose';
import { Direction } from '../../enums/common.enum';
import { FaqCategory, FaqStatus } from '../../enums/faq.enum';

export interface FaqInput {
	faqCategory: FaqCategory;
	faqTitle: string;
	faqContent: string;
	memberId?: ObjectId;
}

export interface FaqInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
}

export interface AFISearch {
	faqStatus?: FaqStatus;
	faqCategory?: FaqCategory;
	text?: string;
}

export interface AllFaqsInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: AFISearch;
}
