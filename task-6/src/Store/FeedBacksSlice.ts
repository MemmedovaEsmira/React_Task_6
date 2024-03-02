import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IFeedback {
    id: number;
    title: string;
    description: string;
    category: string;

}

interface IInitialState {
    value: IFeedback[]
}

const initialState: IInitialState = {
    value: []
}

const FeedBacksSlice = createSlice({
    name: 'feedbacks',
    initialState,

    reducers: {
        addFeedback: (state, action: PayloadAction<IFeedback>) => {
            state.value.push(action.payload)
        }
    }
})

export const { addFeedback } = FeedBacksSlice.actions
export default FeedBacksSlice.reducer