SELECT 
  dbo.RendezVous.Id, 
  dbo.RendezVous.Titre, 
  dbo.RendezVous.Description, 
  dbo.RendezVous.EntrepriseId, 
  dbo.RendezVous.InterlocuteurId,  
  CASE WHEN dbo.RendezVous.TypeRendezVous = 0 THEN 'Physique' ELSE 'Visio' END as TypeRendezVous,
  CASE 
	WHEN dbo.RendezVous.Motif = 0 THEN 'Découverte' 
	WHEN dbo.RendezVous.Motif = 1 THEN 'Négociation' 
	WHEN dbo.RendezVous.Motif = 2 THEN 'Conclusion' 
	WHEN dbo.RendezVous.Motif = 3 THEN 'Courtoisie' 
	WHEN dbo.RendezVous.Motif = 4 THEN 'Visite Chantier' 
	WHEN dbo.RendezVous.Motif = 5 THEN 'JPO' 
	WHEN dbo.RendezVous.Motif = 6 THEN 'Accompagnement Client' 
	ELSE 'Bureau d''études / Architechte' END as Objet, 
  dbo.RendezVous.UserId, 
  dbo.RendezVous.[End], 
  dbo.RendezVous.Start, 
  dbo.AspNetUsers.FirstName as PrenomAgent, 
  dbo.AspNetUsers.LastName  as NomAgent, 
  dbo.AspNetUsers.Email as EmailAgent, 
  dbo.Entreprise.Nom as NomEntreprise, 
  dbo.Entreprise.Addresse, 
  dbo.Entreprise.Ville, 
  dbo.Entreprise.CodePostal,  
  CASE WHEN dbo.Entreprise.TypeEntreprise = 0 THEN 'Ancien' ELSE 'Nouveau' END as TypeEntreprise,
  dbo.Interlocuteur.Id AS InterlocuteurId, 
  dbo.Interlocuteur.Nom AS NomInterlocuteur, 
  dbo.Interlocuteur.Numero AS NumeroInterlocuteur, 
  dbo.Interlocuteur.Email AS EmailInterlocuteur 
FROM 
  dbo.Interlocuteur 
  INNER JOIN dbo.RendezVous ON dbo.Interlocuteur.Id = dbo.RendezVous.InterlocuteurId 
  INNER JOIN dbo.Entreprise ON dbo.RendezVous.EntrepriseId = dbo.Entreprise.Id 
  INNER JOIN dbo.AspNetUsers ON dbo.RendezVous.UserId = dbo.AspNetUsers.Id
