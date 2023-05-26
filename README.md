Descrierea softului folosit:
Aplicația "Taskify" este un site de gestionare a sarcinilor (task-uri), dezvoltată folosind React, o bibliotecă JavaScript pentru construirea de interfețe de utilizator. Pentru autentificare, aplicația folosește Auth0, un serviciu universal de autentificare și autorizare pentru aplicații web, mobile și API. Aplicația include o bază de date Firestore de la Firebase pentru stocarea sarcinilor și a datelor de autentificare a utilizatorilor.

Descrierea părții cu aport propriu:
Am dezvoltat codul pentru gestionarea interacțiunilor cu utilizatorul și a logicii de bază a aplicației. Am creat componentele UI necesare pentru funcționarea aplicației, cum ar fi inputul de sarcini, lista de sarcini și calendarul. De asemenea, am implementat funcții pentru gestionarea evenimentelor de adăugare, eliminare și editare a sarcinilor, precum și pentru gestionarea notelor subordonate. Am implementat și gestionarea priorității taskurilor, precum și salvarea și încărcarea sarcinilor din baza de date Firestore. Autentificarea cu Auth0 a fost de asemenea implementată.

Descrierea elementelor copiate din alte surse:
Elementele copiate din alte surse includ biblioteca React și Auth0 SDK pentru autentificarea utilizatorilor. De asemenea, am folosit biblioteca Firebase pentru a interacționa cu baza de date Firestore. Componentul de calendar folosit în aplicație a fost preluat din biblioteca Mantine.

Cum se folosește aplicația:
Utilizatorii trebuie să se autentifice mai întâi folosind funcționalitatea Auth0. Odată autentificat, utilizatorul poate adăuga taskuri noi, setând o prioritate (scăzută, medie sau înaltă) și o dată scadentă. Utilizatorii pot de asemenea edita și elimina taskurile existente. Aplicația permite și adăugarea de note subordonate pentru fiecare task. Toate taskurile și datele asociate sunt salvate în baza de date Firestore și sunt încărcate din baza de date la autentificarea utilizatorului.

Cerințe hardware minime:
Deoarece este o aplicație web, cerințele de hardware sunt minime. Utilizatorii vor avea nevoie de un dispozitiv cu un browser web modern (cum ar fi Chrome, Firefox, Safari sau Edge) și o conexiune la internet. Autentificarea cu Auth0 poate necesita capacitatea de a deschide o nouă fereastră sau filă în browser.
