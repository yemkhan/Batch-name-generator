{
    var win = new Window("palette", "Muzzu Rename Engine", undefined);
    win.orientation = "column";

    // Game Name Input
    var gameNameGroup = win.add("group");
    gameNameGroup.add("statictext", undefined, "Game Name:");
    var gameName = gameNameGroup.add("edittext", undefined, "TS");
    gameName.characters = 30;

    // Serial Number Inputs
    var serialStartGroup = win.add("group");
    serialStartGroup.add("statictext", undefined, "Starting Serial Number:");
    var serialStart = serialStartGroup.add("edittext", undefined, "10");
    serialStart.characters = 30;

    var serialEndGroup = win.add("group");
    serialEndGroup.add("statictext", undefined, "Ending Serial Number:");
    var serialEnd = serialEndGroup.add("edittext", undefined, "13");
    serialEnd.characters = 30;

    // Artist Name (default to "MK")
    var artistNameGroup = win.add("group");
    artistNameGroup.add("statictext", undefined, "Artist Name:");
    var artistName = artistNameGroup.add("edittext", undefined, "MK");
    artistName.characters = 30;

    // Project Sub-Name Input (e.g., "Muzzu")
    var projectSubNameGroup = win.add("group");
    projectSubNameGroup.add("statictext", undefined, "Project Sub-Name:");
    var projectSubName = projectSubNameGroup.add("edittext", undefined, "Muzzu");
    projectSubName.characters = 30;

    // Motion Input
    var motionTypeGroup = win.add("group");
    motionTypeGroup.add("statictext", undefined, "Motion:");
    var motionType = motionTypeGroup.add("edittext", undefined, "Motion");
    motionType.characters = 30;

    // Level Input
    var levelGroup = win.add("group");
    levelGroup.add("statictext", undefined, "Level:");
    var level = levelGroup.add("edittext", undefined, "Lv3");
    level.characters = 30;

    // Dynamic Concept Fields
    var conceptsGroup = win.add("group");
    conceptsGroup.orientation = "column";

    var conceptFields = [];

    function updateConceptFields() {
        for (var i = 0; i < conceptFields.length; i++) {
            conceptsGroup.remove(conceptFields[i].conceptGroup);
        }
        conceptFields = [];

        var startSerial = parseInt(serialStart.text);
        var endSerial = parseInt(serialEnd.text);
        var numConcepts = endSerial - startSerial + 1;

        for (var i = 0; i < numConcepts; i++) {
            var conceptGroup = conceptsGroup.add("group");
            conceptGroup.add("statictext", undefined, "Concept " + (i + 1) + ":");
            var conceptName = conceptGroup.add("edittext", undefined, "");
            conceptName.characters = 30;

            conceptFields.push({
                conceptGroup: conceptGroup,
                conceptName: conceptName
            });
        }
        win.layout.layout(true);
    }

    serialStart.onChange = updateConceptFields;
    serialEnd.onChange = updateConceptFields;

    updateConceptFields();

    // Suffix Dropdown
    var suffixGroup = win.add("group");
    suffixGroup.add("statictext", undefined, "Suffix:");
    var suffixDropdown = suffixGroup.add("dropdownlist", undefined, ["vert30 (1080x1920_30s)", "vert15 (1080x1920_15s)", "fb15 (1080x1350_15s)", "Custom"]);
    suffixDropdown.selection = 0;

    // Custom Suffix Input
    var customSuffixGroup = win.add("group");
    customSuffixGroup.add("statictext", undefined, "Custom Suffix:");
    var customSuffixInput = customSuffixGroup.add("edittext", undefined, "1080x1920_30s");
    customSuffixInput.characters = 30;
    customSuffixInput.enabled = false;

    // Enable Custom Suffix Input
    suffixDropdown.onChange = function () {
        if (suffixDropdown.selection.text === "Custom") {
            customSuffixInput.enabled = true;
        } else {
            customSuffixInput.enabled = false;
            if (suffixDropdown.selection.text === "vert30 (1080x1920_30s)") {
                customSuffixInput.text = "1080x1920_30s";
            } else if (suffixDropdown.selection.text === "vert15 (1080x1920_15s)") {
                customSuffixInput.text = "1080x1920_15s";
            } else if (suffixDropdown.selection.text === "fb15 (1080x1350_15s)") {
                customSuffixInput.text = "1080x1350_15s";
            }
        }
    };

    // Text Area for Generated Names
    var outputGroup = win.add("group");
    outputGroup.add("statictext", undefined, "Generated Names:");
    var outputTextArea = outputGroup.add("edittext", undefined, "", {
        multiline: true,
        scrolling: true
    });
    outputTextArea.size = [400, 200];

    // Rename Button
    var renameButton = win.add("button", undefined, "Generate Names");

    renameButton.onClick = function () {
        var startSerial = parseInt(serialStart.text);
        var endSerial = parseInt(serialEnd.text);
        var game = gameName.text;
        var artist = artistName.text || "MK";
        var subName = projectSubName.text;
        var motion = motionType.text;
        var levelText = level.text;
        var suffix = customSuffixInput.text;

        var outputText = "";
        for (var i = startSerial; i <= endSerial; i++) {
            var concept = conceptFields[i - startSerial].conceptName.text;

            // Construct the new name
            var newCompName = game + "_" + i + "_" + artist + "_" + subName + "-" + concept + "_" + motion + "-" + levelText + "_" + suffix;
            outputText += newCompName + "\n";
        }

        // Populate the text area with generated names
        outputTextArea.text = outputText;
    };

    win.center();
    win.show();
}
