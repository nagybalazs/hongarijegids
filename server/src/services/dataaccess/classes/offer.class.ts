import {
    OfferType
} from '../index';

import * as moment from 'moment';

export class Offer {

    constructor() { }

    populate(offer: Offer): Offer {
        this.id = offer.id;
        this.email = offer.email;
        this.name = offer.name;
        this.prefdate = moment(offer.prefdate).format('YYYY-MM-DD');
        this.timestamp = offer.timestamp;
        this.type = +offer.type;
        this.content = offer.content;
        return this;
    }

    get typeEnum(): OfferType {
        switch(this.type) {
            case 0: {
                return OfferType.Walk;
            }
            case 1: {
                return OfferType.Bus;
            }
            case 2: {
                return OfferType.Gastro;
            }
            case 3: {
                return OfferType.Wine;
            }
            case 4: {
                return OfferType.Bicycle;
            }
            default: {
                throw Error(`InvEnumKey ${this.type}`);
            }
        }
    }

    get typeString(): string {
        switch(this.typeEnum) {
            case OfferType.Walk: {
                return "Walk";
            }
            case OfferType.Bus: {
                return "Bus";
            }
            case OfferType.Gastro: {
                return "Gastro";
            }
            case OfferType.Wine: {
                return "Wine";
            }
            case OfferType.Bicycle: {
                return "Bicycle";
            }
            default: {
                throw Error(`InVenumVal ${this.typeEnum}`);
            }
        }
    }

    get preferredDate(): Date {
        return moment(this.prefdate).toDate();
    }

    id: number;
    name: string;
    email: string;
    prefdate: string;
    type: OfferType;
    timestamp: number;
    content: string;
}