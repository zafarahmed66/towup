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

export type CookieAttributes = {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
  userType?: string;
};

export interface AuthContextType {
  token: string | null;
  setToken: (value: string, options: CookieAttributes) => void;
  removeToken: () => void;
  userType: UserType | null;
  setUserType: (value: UserType | null, options: CookieAttributes) => void;
  removeUserType: () => void;
  userId: string | null;
  setUserId: (value: string, options: CookieAttributes) => void;
  removeUserId: () => void;
  onLogOut: (event: React.MouseEvent<HTMLElement>) => void;
  setExpiresIn: (value: number, options: CookieAttributes) => void;
  setAuthData: (data: AuthData) => void;
  handleLogout: (message?: string, redirectPath?: string) => void;
}

export interface AuthData {
  token: string;
  expiresIn: number;
  entityId: string;
  userType: UserType;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

export type UserType =
  | "FLEET_OWNER"
  | "REPO_COMPANY"
  | "TOW_TRUCK"
  | "SYS_ADMIN"
  | null;
