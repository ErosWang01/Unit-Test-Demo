import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';
import OrderEntry from '../OrderEntry';

test ('update scoop subtotal when scoop change', async ()=> {
    const user = userEvent.setup();
    render(<Options optionType='scoops' />, {wrapper : OrderDetailsProvider});

    // make sure total starts out $0.00
    const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
    expect(scoopsSubtotal).toHaveTextContent('0.00');
    
    // update vanilla scoops to 1 and check the subtotal
    const vanillaInput = await screen.findByRole('spinbutton', {name: 'Vanilla'})
    await user.clear(vanillaInput);
    await user.type(vanillaInput, '1');
    expect(scoopsSubtotal).toHaveTextContent('2.00');

    const chocolateInput = await screen.findByRole('spinbutton', {name: 'Chocolate'})
    await user.clear(chocolateInput);
    await user.type(chocolateInput, '2');
    expect(scoopsSubtotal).toHaveTextContent("6.00")
});

test ('update toppings subtotal when toppings change', async()=> {
    const user = userEvent.setup();
    render(<Options optionType='toppings'/>, {wrapper : OrderDetailsProvider})

    const toppingsTotal = screen.getByText("Toppings total: $", { exact: false });
    expect(toppingsTotal).toHaveTextContent('0.00');

    const cherriesCheckbox = await screen.findByRole('checkbox', {
        name : 'Cherries'
    });
    await user.click(cherriesCheckbox);
    expect(toppingsTotal).toHaveTextContent('1.50');

    const hotFudgeCheckbox = screen.getByRole('checkbox', { name: 'Hot fudge'});
    await user.click(hotFudgeCheckbox);
    expect(toppingsTotal).toHaveTextContent('3.00');

    await user.click(hotFudgeCheckbox);
    expect(toppingsTotal).toHaveTextContent('1.50')
});

describe('grand total', ()=> {
    test('grand total start at $0', ()=> {

    })

    test('grand total updates properly of scoop is added first', async ()=> {
        const user = userEvent.setup();
        render(<OrderEntry/>, {wrapper : OrderDetailsProvider});
        const grandTotal = screen.getByRole('heading', {name: /Grand total: \$/ });
        expect(grandTotal).toHaveTextContent('0.00');

        const vanillaInput = await screen.findByRole('spinbutton', {
            name: 'Vanilla'
        })
        await user.clear(vanillaInput);
        await user.type(vanillaInput, '2');
        expect(grandTotal).toHaveTextContent('4.00');

        const cherriesCheckbox = await screen.findByRole('checkbox', {
            name: 'Cherries',
        })
        await user.click(cherriesCheckbox);
        expect(grandTotal).toHaveTextContent('5.50');
    })

    test('grand total updates properly of topping is added first', async ()=> {
        const user = userEvent.setup();
        render(<OrderEntry />, {wrapper : OrderDetailsProvider});
        const grandTotal = screen.getByRole('heading', {name: /Grand total: \$/});

        const cherriesCheckbox = await screen.findByRole('checkbox', {
            name: 'Cherries',
        });

        await user.click(cherriesCheckbox);
        expect(grandTotal).toHaveTextContent('1.50');

        const vanillaInput = await screen.findByRole('spinbutton', {
            name: "Vanilla",
        });
        
        await user.clear(vanillaInput);
        await user.type(vanillaInput, '2');
        expect(grandTotal).toHaveTextContent('5.50');
    })

    test('grant total updates if item is removed', async ()=> {
        const user = userEvent.setup();
        render(<OrderEntry />, {wrapper : OrderDetailsProvider});

        const cherriesCheckbox = await screen.findByRole('checkbox', {
            name: 'Cherries',
        });

        await user.click(cherriesCheckbox);

        const vanillaInput = await screen.findByRole('spinbutton', {
            name: "Vanilla",
        });

        await user.clear(vanillaInput);
        await user.type(vanillaInput, '2');

        await user.clear(vanillaInput);
        await user.type(vanillaInput, '1');

        const grandTotal = screen.getByRole('heading', {name: /Grand total: \$/});
        expect(grandTotal).toHaveTextContent('3.50');

        await user.click(cherriesCheckbox);
        expect(grandTotal).toHaveTextContent('2.00');
    })
})