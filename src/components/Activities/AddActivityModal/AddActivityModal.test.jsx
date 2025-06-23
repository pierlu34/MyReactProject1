import { render, screen } from '@testing-library/react';
import { test, expect, describe } from "vitest";
import AddActivityModal from './AddActivityModal.jsx';
import {userSlice} from "../../../reducers/user.slice.js";
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";

const renderComponent = () => {
    const store = configureStore({
        reducer: {
            user: userSlice.reducer
        }
    });

    return render(
        <Provider store={store}>
            <AddActivityModal isOpen={true}/>
        </Provider>
    )
}

describe ('AddActivityModal', () => {
    test('Il modale di Activity è presente', () => {
        renderComponent()
        expect(screen.getByLabelText('modal')).toBeInTheDocument()
    })
    test('Il bottone condividi è presente', () => {  
        renderComponent()
        expect(screen.getByLabelText('sharing-activity')).toBeInTheDocument()
    })
    test('Il modale di Sharing è presente', () => {
        renderComponent()
        // TODO Test Implementation
    })
})