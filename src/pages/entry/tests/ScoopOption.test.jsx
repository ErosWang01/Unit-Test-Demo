import {render, screen} from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import ScoopOption from '../ScoopOption';

test ('Indicate if scoop count is non-int or our of range', async ()=> {
    const user = userEvent.setup();
    render(<ScoopOption />);

    const vanillaInput =screen.getByRole('spinbutton');
    await user.clear(vanillaInput);
    await user.type(vanillaInput, '-1');
    expect(vanillaInput).toHaveClass('is-invalid');

    await user.clear(vanillaInput);
    await user.type(vanillaInput, '2.5');
    expect(vanillaInput).toHaveClass('is-invlid');

    await user.clear(vanillaInput);
    await user.type(vanillaInput, '11');
    expect(vanillaInput).toHaveClass('is-invlid');

    await user.clear(vanillaInput);
    await user.type(vanillaInput, '3');
    expect(vanillaInput).not.toHaveClass('is-invlid');
})