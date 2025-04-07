import {Person, testPersons} from "./Person.ts";
import dayjs, {Dayjs} from 'dayjs'

export interface Meeting {
    id: string;
    name: string;
    date: Dayjs;
    participants: PersonWithStatus[];
}

export interface PersonWithStatus {
    person: Person;
    status: 'invited' | 'accepted' | 'declined';
}

export const testMeets: Meeting[] = [
    {
        id: "1",
        name: "Playing at the park",
        date: dayjs("2023-10-01T12:00:00Z"),
        participants: [
            {person: testPersons[0], status: 'invited'},
            {person: testPersons[1], status: 'accepted'},
        ]
    },
    {
        id: "2",
        name: "Playing at Jane's place",
        date: dayjs("2023-10-02T14:30:00Z"),
        participants: [
            {person: testPersons[2], status: 'declined'},
            {person: testPersons[3], status: 'invited'},
        ]
    },
    {
        id: "3",
        name: "Playing at the community center",
        date: dayjs("2023-10-03T20:00Z"),
        participants: [
            {person: testPersons[4], status: 'accepted'},
            {person: testPersons[0], status: 'declined'},
        ]
    }

]