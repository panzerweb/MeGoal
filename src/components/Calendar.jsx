import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick

/*
    To install new plugins in FullCalendar, type this npm command:
    
    npm install @fullcalendar/plugin_name
*/

export default function Calendar({onDateClick}) {

    return (
        <FullCalendar
            plugins={[ dayGridPlugin, interactionPlugin ]}
            dateClick={onDateClick}
        />
    )
}