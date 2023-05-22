export interface SharedState {
  showLoading: boolean;
  errorMessage: string;
}

export const initialeState: SharedState = {
  showLoading: false,
  errorMessage: '',
};
