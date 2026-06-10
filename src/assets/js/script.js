document.getElementById("reservation").addEventListener("submit", async function (e) {

    e.preventDefault();
    const data = {
        name: this.name.value,
        email: this.email.value,
        phone: this.phone.value,
        date: this.date.value,
        time: this.time.value,
        guests: this.guests.value,
        message: this.message.value,
    };

    try {
        const respond = await fetch("http://localhost:8000/api/reservations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await respond.json();
        alert(result.message);
    } catch (err) {
        console.error("Error submitting reservation:", err);
        alert("Failed to submit reservation. Please try again.");
    }
});
