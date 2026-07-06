export interface RSVPSubmission {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  attending: boolean;
  guestsCount: number;
  drinks?: string[];
  comment?: string;
  submittedAt: string;
}

export interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ColorPalette {
  name: string;
  hex: string;
  description: string;
}
