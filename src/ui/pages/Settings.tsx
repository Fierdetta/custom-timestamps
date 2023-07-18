import { findByName, findByProps } from "@vendetta/metro";
import { moment } from "@vendetta/metro/common";
import { storage } from "@vendetta/plugin";
import { useProxy } from "@vendetta/storage";
import { Forms, General } from "@vendetta/ui/components";
import renderTimestamp from "../../lib/renderTimestamp";

const { ScrollView } = General;
const { FormSection, FormRow, FormDivider } = Forms;
const RowCheckmark = findByName("RowCheckmark");
const { ClearButtonVisibility, default: InputView } = findByProps("ClearButtonVisibility");

function SelectableRow({ label, subLabel, selected, onPress }) {
    return <FormRow label={label} subLabel={subLabel} trailing={<RowCheckmark selected={selected} />} onPress={onPress} />
}

function CustomTimeInputRow({ value, onChangeText, placeholder }) {
    return <InputView
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        clearButtonVisibility={ClearButtonVisibility.WITH_CONTENT}
        showBorder={false}
        showTopContainer={false}
        style={{ paddingHorizontal: 15, paddingVertical: 13 }}
    />
}
let modes = [{ label: "Calendar", key: "calendar" }, { label: "Relative", key: "relative" }, { label: "Custom", key: "custom" }]

export default function Settings() {
    useProxy(storage)

    return <ScrollView>
        <FormSection>
            {modes.map(({ label, key }, i) => <>
                <SelectableRow label={label} subLabel={renderTimestamp(moment(), key)} selected={storage.selected === key} onPress={() => storage.selected = key} />
                {i !== modes.length - 1 && <FormDivider />}
            </>
            )}
            {storage.selected === "custom" && <CustomTimeInputRow value={storage.customFormat} onChangeText={(t) => storage.customFormat = t} placeholder="dddd, MMMM Do YYYY, h:mm:ss a" />}
        </FormSection>
    </ScrollView>
}
