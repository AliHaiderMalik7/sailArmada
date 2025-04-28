import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // Pass the i18n instance to react-i18next
  .init({
    resources: {
      en: {
        translation: {
          rent_title: "Rent a boat",
          rent_desc: "Choose the check-in date and find your boat for rent.",
          dest_title: "Destinations",
          dest_desc:
            "Choose your destination. We have 19000+ boats all over the world, we will for sure find the right one for you!",
          dest_boats_title:
            "Select check-in date to see the updated prices and availabilities.",
          dest_boats_count_title: "boats to rent",
          service: "Services",
          about: "About Us",
          FAQ: "Frequently Asked Questions",
          reviews: "Reviews",
          blog: "Blog",
          top_dest: "Top Destinations",
          spain: "Spain",
          france: "France",
          crotia: "Crotia",
          turkey: "Turkey",
          italy: "Italy",
          greece: "Greece",
          boat_type: "Boat type",
          boat_type_1: "Sailing yacht charter",
          boat_type_2: "Motor yacht charter",
          boat_type_3: "Gulet charter",
          contacts: "Contacts",
          tos: "Terms of Service",
          guides: "Guides",
          partners: "Partners",
          footer_title: "© 2024 Boat Rental - All Rights Reserved.",
          footer_contact: "Contact: +40 7442762326 | hello@sailarmada.com",
          available_text: "Available Yachts",
          header_title: "boat rent, a new way to live the sea",
          search: "SEARCH",
          description: "Description",
          amenities: "Amenities",
          ad_services: "Additional Services",
          all_ad_services: "Show all the additional services",
          dep_time: "Select departure date",
          dep_time_desc: "Enter the check-in date to see the price",
          availability: "Confirmed Availability",
          availability_text:
            "Updated availability and pricing. You can book immediately.",
        },
      },
      it: {
        translation: {
          rent_title: "Noleggiare una barca",
          rent_desc:
            "Scegli la data del check-in e trova la tua barca a noleggio.",
          dest_title: "Destinazioni",
          dest_desc:
            "Scegli la tua destinazione. Abbiamo più di 19000 barche in tutto il mondo, troveremo sicuramente quella giusta per te",
          dest_boats_title:
            "Seleziona la data di check-in per vedere i prezzi aggiornati e le disponibilità.",
          dest_boats_count_title: "barche da noleggiare",
          service: "Servizi",
          about: "About Us",
          FAQ: "Frequently Asked Questions",
          reviews: "Recensioni",
          blog: "Blog",
          top_dest: "Le migliori destinazioni",
          spain: "Spagna",
          france: "Francia",
          crotia: "Croazia",
          turkey: "Turchia",
          italy: "Italia",
          greece: "Grecia",
          boat_type: "Tipo di barca",
          boat_type_1: "Noleggio barche a vela",
          boat_type_2: "Noleggio yacht a motore",
          boat_type_3: "Noleggio caicchi",
          contacts: "Contatti",
          tos: "Termini di servizio",
          guides: "Guide",
          partners: "Partner",
          footer_title: "© 2024 Noleggio Barche - Tutti i diritti riservati.",
          footer_contact: "Contact: +40 7442762326 | hello@sailarmada.com",
          available_text: "Yacht disponibili",

          
        },
      },
      de: {
        translation: {
          rent_title: "Huur een boot",
          rent_desc: "Kies de incheckdatum en vind uw huurboot.",
          dest_title: "Bestemmingen",
          dest_desc:
            "Kies uw bestemming. We hebben meer dan 19.000 boten over de hele wereld, we zullen zeker de juiste voor u vinden!",
          dest_boats_title:
            "Selecteer de incheckdatum om de bijgewerkte prijzen en beschikbaarheid te zien.",
          dest_boats_count_title: "boten te huur",
          service: "Diensten",
          about: "Over ons",
          FAQ: "Veelgestelde vragen",
          reviews: "Recensies",
          blog: "Bloggen",
          top_dest: "Topbestemmingen",
          spain: "Spanje",
          france: "Frankrijk",
          crotia: "Kroatië",
          turkey: "Turkije",
          italy: "Italië",
          greece: "Griekenland",
          boat_type: "Boottype",
          boat_type_1: "Zeiljachtcharter",
          boat_type_2: "Motorjacht charter",
          boat_type_3: "Gulet-charter",
          contacts: "Contacten",
          tos: "Servicevoorwaarden",
          guides: "Gidsen",
          partners: "Partners",
          footer_title: "© 2024 Bootverhuur - Alle rechten voorbehouden.",
          footer_contact: "Contact: +40 7442762326 | hello@sailarmada.com",
          available_text: "Beschikbare jachten",
        },
      },
      fr: {
        translation: {
          rent_title: "Louer un bateau",
          rent_desc:
            "Choisissez la date d'arrivée et trouvez votre bateau à louer.",
          dest_title: "Destinations",
          dest_desc:
            "Choisissez votre destination. Nous avons plus de 19 000 bateaux dans le monde, nous trouverons certainement celui qui vous convient !",
          dest_boats_title:
            "Sélectionnez la date d'arrivée pour voir les prix et disponibilités mis à jour.",
          dest_boats_count_title: "bateaux à louer",
          service: "Services",
          about: "À propos de nous",
          FAQ: "Foire aux questions",
          reviews: "Avis",
          blog: "Blogue",
          top_dest: "Meilleures destinations",
          spain: "Espagne",
          france: "France",
          crotia: "Croatie",
          turkey: "Turquie",
          italy: "Italie",
          greece: "Grèce",
          boat_type: "Type de bateau",
          boat_type_1: "Location de voilier",
          boat_type_2: "Location de yacht à moteur",
          boat_type_3: "Location de goélette",
          contacts: "Contacts",
          tos: "Conditions d'utilisation",
          guides: "Guides",
          partners: "Partenaires",
          footer_title: "© 2024 Location de bateaux - Tous droits réservés.",
          footer_contact: "Contact: +40 7442762326 | hello@sailarmada.com",
          available_text: "Yachts disponibles",
        },
      },
    },
    lng: "en", // Default language
    fallbackLng: "en", // Fallback language if key is not found
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
