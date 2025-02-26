document.addEventListener("DOMContentLoaded", function () {
    const blocks = document.querySelectorAll(".draggable-block");
    const dropZone = document.getElementById("drop-zone");
    const submitButton = document.getElementById("submit-sequence");
    
    let draggedBlock = null;
    let placedBlocks = [];

    // Make blocks draggable
    blocks.forEach(block => {
        block.addEventListener("dragstart", function () {
            draggedBlock = this;
            setTimeout(() => this.style.opacity = "0.5", 0);
        });

        block.addEventListener("dragend", function () {
            setTimeout(() => this.style.opacity = "1", 0);
        });
    });

    // Drop zone events
    dropZone.addEventListener("dragover", function (e) {
        e.preventDefault();
        this.classList.add("dragover");
    });

    dropZone.addEventListener("dragleave", function () {
        this.classList.remove("dragover");
    });

    dropZone.addEventListener("drop", function (e) {
        e.preventDefault();
        this.classList.remove("dragover");

        if (draggedBlock) {
            placedBlocks.push(draggedBlock.id.replace("block-", ""));
            this.appendChild(draggedBlock);
        }
    });

    // Allow redragging back to original container
    document.getElementById("block-container").addEventListener("dragover", function (e) {
        e.preventDefault();
    });

    document.getElementById("block-container").addEventListener("drop", function (e) {
        e.preventDefault();
        if (draggedBlock) {
            placedBlocks = placedBlocks.filter(id => id !== draggedBlock.id.replace("block-", ""));
            this.appendChild(draggedBlock);
        }
    });

    // Submit sequence to backend
    submitButton.addEventListener("click", function () {
        fetch("/validate-sequence/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                level_id: levelId,
                sequence: placedBlocks.join("-"),
            }),
        })
        .then(response => response.json())
        .then(data => alert(data.message))
        .catch(error => console.error("Error:", error));
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const dropZone = document.getElementById("drop-zone");
    const placeholder = document.getElementById("drop-placeholder");

    dropZone.addEventListener("dragover", function (event) {
        event.preventDefault();
        dropZone.classList.add("dragover");
    });

    dropZone.addEventListener("dragleave", function () {
        dropZone.classList.remove("dragover");
    });

    dropZone.addEventListener("drop", function (event) {
        event.preventDefault();
        dropZone.classList.remove("dragover");

        const draggedBlock = document.querySelector(".dragging");
        if (draggedBlock) {
            dropZone.appendChild(draggedBlock);
            draggedBlock.classList.remove("dragging");
            
            // Remove placeholder once a block is dropped
            if (placeholder) {
                placeholder.style.display = "none";
            }
        }
    });

    // Add dragstart and dragend events to blocks
    document.querySelectorAll(".draggable-block").forEach(block => {
        block.addEventListener("dragstart", function () {
            this.classList.add("dragging");
        });

        block.addEventListener("dragend", function () {
            this.classList.remove("dragging");
        });
    });
});
