export interface Profile {
	id: string;
	email: string;
	role : string;
	profile: { name: string; image: string; bio: string };
}
