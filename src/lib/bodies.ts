import {Body} from "./Body";

export const bodies = {
    sol: new Body('sol', 'Sun', 696340, 0xf8c87d),
    mercury: new Body('mercury', 'Mercury', 2439.7, 0x9B9490FF),
    venus: new Body('venus', 'Venus', 6051.8, 0x9B9490FF),
    earth: new Body('earth', 'Earth', 6371, 0x2cbee3),
    moon: new Body('moon', 'Moon', 1737.4, 0x9B9490FF)
}