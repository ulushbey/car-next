import { NotificationGroup, NotificationStatus, NotificationType } from "../../enums/notification.enum";
import { Member } from "../member/member";
import { TotalCounter } from "../property/property";

export interface NotificationDto {
    _id:string
	notificationType?: NotificationType;
	notificationStatus?: NotificationStatus
	notificationGroup?: NotificationGroup;
	notificationTitle: string;
	notificationDesc?: string;
	authorId: string;
	receiverId: string;
	propertyId?: string;
	articleId?: string;

	/** from aggregation **/

	memberData?: Member[];
}

export interface Notifications {
	list: NotificationDto[];
	metaCounter: TotalCounter[];
}