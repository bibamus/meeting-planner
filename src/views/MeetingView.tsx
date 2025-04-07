import {useState} from "react";
import {Meeting} from "../model/Meeting.ts";
import {Person} from "../model/Person.ts";
import MeetingOverviewComponent from "../components/MeetingOverviewComponent.tsx";
import MeetingDetailComponent from "../components/MeetingDetailComponent.tsx";

interface MeetingViewProps {
    meetings: Meeting[],
    setMeetings: (meetings: Meeting[]) => void,
    persons: Person[]
}

function MeetingView({meetings, setMeetings, persons}: MeetingViewProps) {

    const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

    const updateMeeting = (updatedMeeting: Meeting) => {
        setMeetings(meetings.map(meeting => meeting.id === updatedMeeting.id ? updatedMeeting : meeting));
        setSelectedMeeting(updatedMeeting)
    };

    return (
        <>
            {selectedMeeting === null && <MeetingOverviewComponent meetings={meetings} setMeetings={setMeetings}
                                                                   setSelectedMeeting={setSelectedMeeting}/>
            }
            {selectedMeeting !== null && (
                <MeetingDetailComponent meeting={selectedMeeting} persons={persons} updateMeeting={updateMeeting}/>
            )}
        </>
    )
}

export default MeetingView;