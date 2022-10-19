import {render, screen } from '@testing-library/react';
import SummaryForm from '../SummaryForm';
import userEvent from '@testing-library/user-event';

test ('Initial conditions', ()=> {
    render(<SummaryForm />);
    const checkbox= screen.getByRole('checkbox', {
        name: /terms and conditions/i,
    });
    expect(checkbox).not.toBeChecked();

    const confirmButton = screen.getByRole('button', {
        name: /confirm order/i,
    });
    expect(confirmButton).toBeDisabled();
});

test ('checkbox disables button on first check and enables on second click', async()=> {
    const user = userEvent.setup();
    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', {
        name: /terms and conditions/i,
    });
    const confirmButton = screen.getByRole('button', {
        name: /confirm order/i,
    });
    await user.click(checkbox);
    expect(confirmButton).toBeEnabled();

    await user.click(checkbox);
    expect(confirmButton).toBeDisabled();
});

test('popover responds to hover', async()=> {
    const user = userEvent.setup();
    render(<SummaryForm />)
    // popver starts out hidden
    const nullPoperover= screen.queryByText(/no ice cream will actually be delivered/i);
    expect(nullPoperover).not.toBeInTheDocument();
    
     // popver show on hover
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    await user.hover(termsAndConditions);
    const popover = screen.getByText(/no ice cream will actually be delivered/i);
    expect(popover).toBeInTheDocument();

     // popver not show when unhover
    await user.unhover(termsAndConditions);
    expect(popover).not.toBeInTheDocument();
})