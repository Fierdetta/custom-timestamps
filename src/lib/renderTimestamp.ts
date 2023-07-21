import { storage } from "@vendetta/plugin";
import { Mode } from "../ui/pages/Settings";

export default function renderTimestamp(timestamp: moment.Moment, mode: Mode["key"] = storage.selected): string {
    switch (mode) {
        case "calendar":
            return timestamp.calendar();
        case "relative":
            return timestamp.fromNow();
        case "iso":
            return timestamp.toISOString();
        case "custom":
            return timestamp.format(storage.customFormat);
    }
}
