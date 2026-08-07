--
-- PostgreSQL database dump
--

\restrict EdBlXNdeJYta9SYSiRi1VN7dpqNvnFYi3k14ax599HFAhlNqTRiJvjxjHYkHdQ0

-- Dumped from database version 18.4 (Debian 18.4-1.pgdg13+1)
-- Dumped by pg_dump version 18.4 (Debian 18.4-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: tb_account; Type: TABLE; Schema: public; Owner: api
--

CREATE TABLE public.tb_account (
    id uuid NOT NULL,
    email character varying(255),
    nickname character varying(255),
    password character varying(255)
);


ALTER TABLE public.tb_account OWNER TO api;

--
-- Name: tb_anime_lists; Type: TABLE; Schema: public; Owner: api
--

CREATE TABLE public.tb_anime_lists (
    list_id uuid NOT NULL,
    anime_id uuid NOT NULL
);


ALTER TABLE public.tb_anime_lists OWNER TO api;

--
-- Name: tb_animes; Type: TABLE; Schema: public; Owner: api
--

CREATE TABLE public.tb_animes (
    id uuid NOT NULL,
    episode integer,
    favorite boolean,
    finished boolean,
    need_to_watch boolean,
    release_day smallint,
    season integer,
    title character varying(255),
    waiting_for_next_season boolean,
    watched boolean,
    CONSTRAINT tb_animes_release_day_check CHECK (((release_day >= 0) AND (release_day <= 6)))
);


ALTER TABLE public.tb_animes OWNER TO api;

--
-- Name: tb_lists; Type: TABLE; Schema: public; Owner: api
--

CREATE TABLE public.tb_lists (
    id uuid NOT NULL,
    name character varying(255),
    owner_id uuid
);


ALTER TABLE public.tb_lists OWNER TO api;

--
-- Data for Name: tb_account; Type: TABLE DATA; Schema: public; Owner: api
--

COPY public.tb_account (id, email, nickname, password) FROM stdin;
5ad7f133-0bd2-4caa-9bdc-decaa5536014	machadosantosrenan@gmail.com	renan	$2a$10$paYkKvEAagYeb4kT1R4fbegAkzIXNUJiNmNxomXDrkLfnDlqj.m1u
\.


--
-- Data for Name: tb_anime_lists; Type: TABLE DATA; Schema: public; Owner: api
--

COPY public.tb_anime_lists (list_id, anime_id) FROM stdin;
4be20423-7455-45e6-b729-e0d503abcbc1	4f7d3bd7-4ff5-4f75-bb5d-fcc583120dc2
4be20423-7455-45e6-b729-e0d503abcbc1	27ccad56-3cc2-4935-a152-51fd506f840e
cd2c450c-3cfc-424b-a564-4a8409ff60db	27ccad56-3cc2-4935-a152-51fd506f840e
cd2c450c-3cfc-424b-a564-4a8409ff60db	c3f5ab75-645f-4308-9364-6d289f31b2e8
cd2c450c-3cfc-424b-a564-4a8409ff60db	545a77d4-b0df-4bd2-9f6c-00d84665e241
cd2c450c-3cfc-424b-a564-4a8409ff60db	444c8065-b0fb-41ef-b037-042628076e9c
cd2c450c-3cfc-424b-a564-4a8409ff60db	8a0cde30-8772-44e6-9c2d-52feb0af0e2a
cd2c450c-3cfc-424b-a564-4a8409ff60db	ba53a216-ed5e-41ba-9614-c06d99077e2c
cd2c450c-3cfc-424b-a564-4a8409ff60db	ffd697c2-51a9-4b59-9b14-780c17420b1d
cd2c450c-3cfc-424b-a564-4a8409ff60db	7d0e978b-8974-44d7-a410-682c1938897c
cd2c450c-3cfc-424b-a564-4a8409ff60db	3c3325c3-0d9c-44bf-aab6-1fd3879e199e
cd2c450c-3cfc-424b-a564-4a8409ff60db	c86a0058-9900-44d4-a949-edef9227063f
cd2c450c-3cfc-424b-a564-4a8409ff60db	5d132837-8a92-438a-85e9-0d9c1e33bc41
cd2c450c-3cfc-424b-a564-4a8409ff60db	2c10f117-775c-4c71-93a6-f3b72a5f2841
cd2c450c-3cfc-424b-a564-4a8409ff60db	37b46ce7-3ce0-4902-aaa4-5636080c0b61
cd2c450c-3cfc-424b-a564-4a8409ff60db	7c644560-7650-42b7-a972-e919a55ddca4
cd2c450c-3cfc-424b-a564-4a8409ff60db	6745391f-3637-45d6-b8da-910055e53ec9
cd2c450c-3cfc-424b-a564-4a8409ff60db	b66f3568-be18-4c8a-a622-05f9c99a8a3c
cd2c450c-3cfc-424b-a564-4a8409ff60db	1bac1b15-c009-4928-9018-0f35970a77c5
cd2c450c-3cfc-424b-a564-4a8409ff60db	4f7d3bd7-4ff5-4f75-bb5d-fcc583120dc2
cd2c450c-3cfc-424b-a564-4a8409ff60db	66544ccf-ce4a-4cfa-8e9f-0836fc7ae2b7
cd2c450c-3cfc-424b-a564-4a8409ff60db	94d6b930-e921-44fb-9b1b-acefa5819ce6
cd2c450c-3cfc-424b-a564-4a8409ff60db	bdd5eaa8-495e-43c2-adef-694ec5993399
cd2c450c-3cfc-424b-a564-4a8409ff60db	1775a2f2-0976-4c12-92be-60850e9c43ab
\.


--
-- Data for Name: tb_animes; Type: TABLE DATA; Schema: public; Owner: api
--

COPY public.tb_animes (id, episode, favorite, finished, need_to_watch, release_day, season, title, waiting_for_next_season, watched) FROM stdin;
27ccad56-3cc2-4935-a152-51fd506f840e	30	t	t	f	6	10	Naruto Shipuden	f	t
c3f5ab75-645f-4308-9364-6d289f31b2e8	12	t	f	f	6	1	Saikyou no Shienshoku	t	t
545a77d4-b0df-4bd2-9f6c-00d84665e241	1	t	f	t	6	1	Tenkou-saki	f	f
28e79296-d5a7-4c80-b74f-cad6a72f56a3	1	f	f	t	6	1	Gachiakuta	t	f
8a0cde30-8772-44e6-9c2d-52feb0af0e2a	11	t	f	f	6	1	Chitose-kun wa	t	t
8421d7e4-f96a-41c1-94ec-706b128cb04f	1	f	f	t	6	1	Majutsushi Kunon	t	f
ba53a216-ed5e-41ba-9614-c06d99077e2c	1	t	f	t	6	1	Yuusha-kei ni Shoshu	t	f
ffd697c2-51a9-4b59-9b14-780c17420b1d	1	t	f	t	6	1	Yuusha Party wo Oidasareta	t	f
7d0e978b-8974-44d7-a410-682c1938897c	12	t	f	f	6	3	Jujutsu Kaisen	t	t
3c3325c3-0d9c-44bf-aab6-1fd3879e199e	12	t	f	f	6	2	Jigokuraku	t	t
c86a0058-9900-44d4-a949-edef9227063f	12	t	f	f	6	3	Oshi no Ko	t	t
5d132837-8a92-438a-85e9-0d9c1e33bc41	1	t	f	t	6	2	Sousou no Frieren	t	f
6c63496d-c61b-4c9b-a621-71242ba1b3fd	1	f	f	t	6	1	Dark Moon	t	f
f1b55068-a19b-4e2b-b100-eb9588353b0b	1	f	f	t	6	1	Eris no Seihai	t	f
566beea5-cdd7-4f3a-87c8-24998560bd34	1	f	f	t	6	1	Hazure Skill	t	f
2c10f117-775c-4c71-93a6-f3b72a5f2841	12	t	f	f	6	1	Tongari Boushi	t	t
37b46ce7-3ce0-4902-aaa4-5636080c0b61	12	t	f	f	6	2	Tsue no Tsurugi	t	t
036ee2cf-3ca0-4262-aa8a-1e4b602bf04f	1	f	f	t	6	1	Kuroneko no Majo	t	f
e47ba40e-77dd-4a3f-b9e4-0047b87180d7	3	f	f	f	6	2	Isekai nonbiri nouka	t	f
7c644560-7650-42b7-a972-e919a55ddca4	11	t	f	f	6	4	Re:zero	t	f
ba6d8464-9c24-4689-84f6-185609f19249	1	f	f	t	6	1	Magic Maker	t	f
ec9a2945-a93d-4575-be4f-a3a6222e50cc	1	f	f	t	6	1	Isekai no Cheat Skill	t	t
6745391f-3637-45d6-b8da-910055e53ec9	16	t	f	f	6	3	Tensei shitara slime	f	f
b66f3568-be18-4c8a-a622-05f9c99a8a3c	1	t	f	t	6	1	Sekai Saikou no Ansatsusha	t	t
1bac1b15-c009-4928-9018-0f35970a77c5	6	t	f	f	6	3	Mushoku Tensei	f	f
cbd7a7ef-765d-4c6b-b390-51d2b75d5be6	5	f	f	f	6	1	Buchigire Reijou	f	f
4f7d3bd7-4ff5-4f75-bb5d-fcc583120dc2	1	t	f	t	6	4	Classroom of the Elite	t	f
66544ccf-ce4a-4cfa-8e9f-0836fc7ae2b7	5	t	f	f	2	2	Otomo game sekai	f	f
94d6b930-e921-44fb-9b1b-acefa5819ce6	1	t	f	t	6	1	Vanitas no Carte	t	t
bdd5eaa8-495e-43c2-adef-694ec5993399	4	t	f	f	6	1	Futsutsuka	f	f
9108fd43-4dd1-41a5-b112-ad1567284cc2	5	f	f	f	2	1	Mujikaku Seijo	f	f
eaa003ba-a922-418d-854d-6180bd31363c	5	f	f	f	6	1	Kimi wo Aisuru	f	f
73abbf82-066e-4180-bd17-e1603fabac16	7	f	f	f	3	1	Rakudai Kenja	f	f
094b38bd-5579-44ba-8187-9ef1264000eb	1	f	f	f	6	2	Katainaka no ossan	t	f
1775a2f2-0976-4c12-92be-60850e9c43ab	6	t	f	f	3	1	Tsuihou Sareta Tensei	f	f
444c8065-b0fb-41ef-b037-042628076e9c	2	t	f	f	6	1	Gaikotsu	f	f
\.


--
-- Data for Name: tb_lists; Type: TABLE DATA; Schema: public; Owner: api
--

COPY public.tb_lists (id, name, owner_id) FROM stdin;
cd2c450c-3cfc-424b-a564-4a8409ff60db	Favoritos	5ad7f133-0bd2-4caa-9bdc-decaa5536014
4be20423-7455-45e6-b729-e0d503abcbc1	Teste	5ad7f133-0bd2-4caa-9bdc-decaa5536014
5c78a1e4-2cf1-499e-9a0e-21fbc881620e	Teste2	5ad7f133-0bd2-4caa-9bdc-decaa5536014
\.


--
-- Name: tb_account tb_account_pkey; Type: CONSTRAINT; Schema: public; Owner: api
--

ALTER TABLE ONLY public.tb_account
    ADD CONSTRAINT tb_account_pkey PRIMARY KEY (id);


--
-- Name: tb_animes tb_animes_pkey; Type: CONSTRAINT; Schema: public; Owner: api
--

ALTER TABLE ONLY public.tb_animes
    ADD CONSTRAINT tb_animes_pkey PRIMARY KEY (id);


--
-- Name: tb_lists tb_lists_pkey; Type: CONSTRAINT; Schema: public; Owner: api
--

ALTER TABLE ONLY public.tb_lists
    ADD CONSTRAINT tb_lists_pkey PRIMARY KEY (id);


--
-- Name: tb_lists fkacmoq9cvu28avj5ul1nq5e1kf; Type: FK CONSTRAINT; Schema: public; Owner: api
--

ALTER TABLE ONLY public.tb_lists
    ADD CONSTRAINT fkacmoq9cvu28avj5ul1nq5e1kf FOREIGN KEY (owner_id) REFERENCES public.tb_account(id);


--
-- Name: tb_anime_lists fko3wly5k075ilopb6w2t22h8ld; Type: FK CONSTRAINT; Schema: public; Owner: api
--

ALTER TABLE ONLY public.tb_anime_lists
    ADD CONSTRAINT fko3wly5k075ilopb6w2t22h8ld FOREIGN KEY (list_id) REFERENCES public.tb_lists(id);


--
-- Name: tb_anime_lists fktfy62cxq29nojt663o0ye04q8; Type: FK CONSTRAINT; Schema: public; Owner: api
--

ALTER TABLE ONLY public.tb_anime_lists
    ADD CONSTRAINT fktfy62cxq29nojt663o0ye04q8 FOREIGN KEY (anime_id) REFERENCES public.tb_animes(id);


--
-- PostgreSQL database dump complete
--

\unrestrict EdBlXNdeJYta9SYSiRi1VN7dpqNvnFYi3k14ax599HFAhlNqTRiJvjxjHYkHdQ0

