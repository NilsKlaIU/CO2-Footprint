/*************************** Index **************************/

$(document).ready(function () {
  // jQuery: Warte, bis das DOM vollständig geladen ist
  // Diese Funktion stellt sicher, dass das HTML vollständig geladen ist, bevor jQuery auf die Elemente zugreift.

  // jQuery: Event-Listener für den Button "Jetzt mehr erfahren"
  $("#showContentBtn").on("click", function () {
    // jQuery: Verstecke den "Hero"-Bereich der Seite
    $("#hero").hide();

    // jQuery: Entferne die Klasse "hidden" vom Inhaltsbereich, um diesen anzuzeigen
    $("#content").removeClass("hidden");

    // jQuery: Lade die Datei "Startseite.html" in den Bereich mit der ID "main-content"
    $("#main-content").load("Startseite.html");
  });

  // jQuery: Event-Listener für alle Links mit dem Attribut 'data-content'
  $("a[data-content]").on("click", function (e) {
    // jQuery: Verhindert das Standardverhalten des Links (Seitenreload)
    e.preventDefault();

    // jQuery: Extrahiere den Dateinamen aus dem 'data-content'-Attribut des angeklickten Links
    let page = $(this).data("content");

    // jQuery: Verstecke den "Hero"-Bereich
    $("#hero").hide();

    // jQuery: Entferne die Klasse "hidden", um den Inhaltsbereich anzuzeigen
    $("#content").removeClass("hidden");

    // jQuery: Lade die entsprechende Seite in den Bereich mit der ID 'main-content'
    $("#main-content").load(page);
  });
});

// Funktion zum Umschalten der Leserichtung
function toggleDirection() {
  let html = document.documentElement;
  if (html.getAttribute("dir") === "ltr") {
    html.setAttribute("dir", "rtl"); // Leserichtung auf RTL umstellen
  } else {
    html.setAttribute("dir", "ltr"); // Leserichtung zurück auf LTR stellen
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const language = navigator.language;
  // 'ar' = Arabisch, 'he' = Hebräisch, 'fa' = Persisch (Farsi), 'ur' = Urdu
  const rtlLanguages = ["ar", "he", "fa", "ur"];
  if (rtlLanguages.includes(language.substring(0, 2))) {
    document.documentElement.setAttribute("dir", "rtl");
  } else {
    document.documentElement.setAttribute("dir", "ltr");
  }
});

/*************************** Tabelle **************************/

//Filterfunktion

$(document).ready(function () {
  // jQuery: Fügt ein 'keyup'-Event zu den beiden Eingabefeldern  hinzu.
  $("#countryFilter, #companyFilter").on("keyup", function () {
    // jQuery: Holt den aktuellen Wert des Länderfilter-Eingabefelds und konvertiert ihn in Kleinbuchstaben.
    let countryValue = $("#countryFilter").val().toLowerCase();
    // jQuery: Holt den aktuellen Wert des Unternehmensfilter-Eingabefelds und konvertiert ihn in Kleinbuchstaben.
    let companyValue = $("#companyFilter").val().toLowerCase();

    // jQuery: Filtert die Tabellenzeilen (tr) im Tabellenkörper (tbody) basierend auf den Eingabewerten.
    $("#emissionTable tbody tr").filter(function () {
      // jQuery: Zeigt die Zeilen nur dann an, wenn der Ländername und der Unternehmensname
      // (in der entsprechenden Spalte) mit den Eingabefeldern übereinstimmen.
      $(this).toggle(
        $(this)
          .find("td:nth-child(1)") // jQuery: Holt den Text der ersten Spalte (Ländername) der aktuellen Zeile.
          .text()
          .toLowerCase() // Konvertiert den Text in Kleinbuchstaben für den Vergleich.
          .indexOf(countryValue) > -1 && // Überprüft, ob der Ländername den Eingabewert enthält.
          $(this)
            .find("td:nth-child(2)") // jQuery: Holt den Text der zweiten Spalte (Unternehmensname) der aktuellen Zeile.
            .text()
            .toLowerCase() // Konvertiert den Text in Kleinbuchstaben für den Vergleich.
            .indexOf(companyValue) > -1 // Überprüft, ob der Unternehmensname den Eingabewert enthält.
      );
    });
  });

  // jQuery: Fügt ein 'click'-Event zum Reset-Button hinzu.
  $("#resetButton").on("click", function () {
    // jQuery: Leert das Eingabefeld für den Länderfilter.
    $("#countryFilter").val("");
    // jQuery: Leert das Eingabefeld für den Unternehmensfilter.
    $("#companyFilter").val("");
    // jQuery: Zeigt alle Zeilen der Tabelle wieder an (setzt den Filter zurück).
    $("#emissionTable tbody tr").show();
  });

  // Generiere zufällige Daten und füge sie in die Tabelle ein.
  generateRandomData();
});

// Funktion zum Generieren und Einfügen von zufälligen Daten in die Tabelle
function generateRandomData() {
  // Array mit den verfügbaren Ländernamen
  const countries = [
    "Deutschland",
    "Frankreich",
    "Spanien",
    "Italien",
    "Niederlande",
    "Schweiz",
    "Österreich",
    "Belgien",
    "Schweden",
    "Norwegen",
  ];

  // Funktion zum Generieren eines zufälligen Unternehmensnamens.
  function generateRandomCompanyName() {
    const prefixes = ["Tech", "Future", "Green", "Quantum", "Digital"]; // Unternehmenspräfixe
    const suffixes = [
      "Innovations",
      "Solutions",
      "Enterprises",
      "Dynamics",
      "Ventures",
    ]; // Unternehmenssuffixe/prefixe
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    // Gibt den vollständigen Unternehmensnamen zurück.
    return `${randomPrefix} ${randomSuffix}`;
  }

  // Funktion zum Generieren einer zufälligen Zahl(CO2-Emissionen).
  function getRandomNumber() {
    return Math.floor(Math.random() * 100000000) + 1000; // Generiere eine Zufallszahl zwischen 1000 und 100000000.
  }

  // Schleife, die 100 zufällige Datensätze erstellt und in die Tabelle einfügt.
  for (let i = 0; i < 100; i++) {
    const randomCountry =
      countries[Math.floor(Math.random() * countries.length)]; // Zufälliges Land auswählen.
    const randomCompany = generateRandomCompanyName(); // Zufälligen Unternehmensnamen generieren.
    const randomNumber = getRandomNumber(); // Zufällige Zahl für Emissionen generieren.

    // Erstelle eine neue Tabellenzeile mit den generierten Daten.
    const newRow = `<tr>
                <td>${randomCountry}</td>
                <td>${randomCompany}</td>
                <td>${randomNumber}</td>
            </tr>`;

    // jQuery: Füge die neue Zeile in den Tabellenkörper ein.
    $("#emissionDataBody").append(newRow);
  }
}

// Funktion zum Sortieren der Tabelle basierend auf der ausgewählten Spalte (columnIndex)
function sortTable(columnIndex) {
  let table = $("#emissionTable tbody");

  // jQuery: Konvertiert die Tabellenzeilen (tr) in ein Array und sortiert sie basierend auf der Spalte.
  let rows = table.find("tr").toArray().sort(comparer(columnIndex));

  // Umschalten der Sortierreihenfolge (aufsteigend/absteigend)
  this.asc = !this.asc;

  // jQuery: Entfernt die aktuellen Sortierpfeile (asc/desc) aus allen Spaltenüberschriften.
  $(".sort-arrow").removeClass("asc desc");

  // Überprüfen, ob die Sortierung absteigend ist.
  if (!this.asc) {
    rows = rows.reverse(); // Reihenfolge der Zeilen umkehren .
    // jQuery: Füge den "desc"-Pfeil zur aktuell sortierten Spalte hinzu.
    $(table)
      .prev()
      .find("th")
      .eq(columnIndex)
      .children(".sort-arrow")
      .addClass("desc");
  } else {
    // jQuery: Füge den "asc"-Pfeil zur aktuell sortierten Spalte hinzu.
    $(table)
      .prev()
      .find("th")
      .eq(columnIndex)
      .children(".sort-arrow")
      .addClass("asc");
  }

  // jQuery: Fügt die sortierten Zeilen wieder in den Tabellenkörper ein.
  for (let i = 0; i < rows.length; i++) {
    table.append(rows[i]);
  }
}

// Funktion, die zwei Tabellenzeilen vergleicht, um sie zu sortieren.
function comparer(index) {
  return function (a, b) {
    let valA = getCellValue(a, index),
      valB = getCellValue(b, index);

    if ($.isNumeric(valA) && $.isNumeric(valB)) {
      return valA - valB; // Wenn beide Werte numerisch sind, gib die Differenz zurück
    } else {
      return valA.localeCompare(valB); // Wenn nicht, vergleiche sie lexikographisch
    }
  };
}

// Funktion zum Abrufen des Textinhalts einer Zelle in einer bestimmten Spalte.
function getCellValue(row, index) {
  // jQuery: Holt den Text der Zelle in der angegebenen Spalte (index) der Zeile (row).
  return $(row).children("td").eq(index).text();
}
