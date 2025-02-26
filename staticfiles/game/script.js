document.addEventListener("DOMContentLoaded", function () {
    const blocks = document.querySelectorAll(".draggable-block");
    const dropZone = document.getElementById("drop-zone");
    const blockContainer = document.getElementById("block-container");
    let draggedBlock = null;

    // Enable drag on each block
    blocks.forEach(block => {
        block.addEventListener("dragstart", function (e) {
            draggedBlock = this;
            setTimeout(() => this.style.display = "none", 0);
        });

        block.addEventListener("dragend", function () {
            setTimeout(() => this.style.display = "flex", 0);
            draggedBlock = null;
        });
    });

    // Allow drop on the drop zone
    dropZone.addEventListener("dragover", function (e) {
        e.preventDefault();
    });

    dropZone.addEventListener("drop", function () {
        if (draggedBlock) {
            this.appendChild(draggedBlock);
        }
    });

    // Allow blocks to be returned to original container
    blockContainer.addEventListener("dragover", function (e) {
        e.preventDefault();
    });

    blockContainer.addEventListener("drop", function () {
        if (draggedBlock) {
            this.appendChild(draggedBlock);
        }
    });

    // Submit button logic
    document.getElementById("submit-sequence").addEventListener("click", function () {
        let sequence = Array.from(dropZone.children).map(block => block.id.split("-")[1]).join("-");
        fetch("/validate-sequence/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ level_id: levelId, sequence: sequence }),
        })
        .then(response => response.json())
        .then(data => alert(data.message));
    });
});
