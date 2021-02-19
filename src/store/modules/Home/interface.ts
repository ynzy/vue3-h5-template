
/**
 * @ 页面常用类开头 I 
 * @ 接口参数类开头 A
 */

export interface IHomeState {
  cityList: ICity[],
  currentCommunity: IcurrentCommunity,
  commonlyUsedDoor: ICommonlyUsedDoor,
  accessControlList: IAccessControl[]
}

export interface ICity {
  cityName: string,
  cityId: string,
  communityId: string,
  communityName: string,
  provinceName: string,
  districtName: string
}

export interface IAccessControl {
  doorControlId: string,
  doorControlName: string
}

export interface IcurrentCommunity{
  communityId: string,
  communityName: string
}

export interface ICommonlyUsedDoor{
  doorControlId: string,
  doorControlName: string
}

export interface AGetBuilding{
  communityId: string | number,
  userId: string | number
}