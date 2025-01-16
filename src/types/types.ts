interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface AppNotificationSetting {
  emailNotificationEnabled: boolean;
  smsNotificationEnabled: boolean;
  appNotificationEnabled: boolean;
}

interface User {
  email: string;
  fullname: string;
  password: string;
  phoneNumber: string | undefined;
  appNotificationSetting: AppNotificationSetting;
}

interface TelematicSettings {
  telematicProvider: string;
  telematicApiKey: string;
}

export interface Data {
  companyName: string;
  phoneNumber: number;
  operationalRegions: string[];
  address: Address;
  user: User;
  telematicSettings?: TelematicSettings; 
}
