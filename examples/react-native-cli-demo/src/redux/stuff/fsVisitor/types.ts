import {
  IFlagshipVisitor,
  FlagshipVisitorContext,
  DecisionApiCampaign,
  BucketingApiResponse,
  DecisionApiResponseData,
} from '@flagship.io/js-sdk';

export type UpdateFsVisitor = {
  type: string;
  payload: IFlagshipVisitor;
};

export type FsVisitorState = {
  id?: string;
  envId?: string;
  context?: FlagshipVisitorContext;
  isAllModificationsFetched?: boolean;
  bucket?: {
    data: null | BucketingApiResponse;
    computedData: null | DecisionApiResponseData;
    envId: null | string;
    visitorId: null | string;
    visitorContext: null | FlagshipVisitorContext;
  } | null;
  fetchedModifications?: DecisionApiCampaign[] | null;
};

export type FsVisitorAction = UpdateFsVisitor;