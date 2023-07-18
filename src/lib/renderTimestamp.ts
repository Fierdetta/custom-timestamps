import { storage } from "@vendetta/plugin";

export default function renderTimestamp(timestamp: moment.Moment, mode: string): string {
    switch (mode) {
        case "calendar":
            return timestamp.calendar();
        case "relative":
            return timestamp.fromNow();
        case "custom":
            return timestamp.format(storage.customFormat);
    }
}
