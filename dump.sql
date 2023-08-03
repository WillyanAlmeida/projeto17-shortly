CREATE TABLE "public.users" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.shortly" (
	"id" serial NOT NULL,
	"link" character NOT NULL,
	"shortlylink" integer NOT NULL,
	"createdAt" TIMESTAMP NOT NULL,
	"createdBy" integer NOT NULL,
	"views" integer NOT NULL,
	CONSTRAINT "shortly_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "shortly" ADD CONSTRAINT "shortly_fk0" FOREIGN KEY ("createdBy") REFERENCES "users"("id");



