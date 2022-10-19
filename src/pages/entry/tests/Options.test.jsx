import { render, screen } from '../../../test-utils/testing-library-utils';
import Options from '../Options';

test ('display each image from server', async ()=> {
    render(<Options optionType='scoops'/>);

    const scoopImages = await screen.findAllByRole('img', {name: /scoop$/i});
    expect(scoopImages).toHaveLength(2);

    const allText = scoopImages.map((element)=> element.alt);
    expect(allText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('display image for each topping option from server', async ()=> {
    render(<Options optionType='toppings' />)

    const scoopImages = await screen.findAllByRole('img', {name: /topping$/i});
    expect(scoopImages).toHaveLength(3);

    const allText = scoopImages.map((element)=> element.alt);
    expect(allText).toEqual(['Cherries topping', 'M&Ms topping', 'Hot fudge topping']);
})