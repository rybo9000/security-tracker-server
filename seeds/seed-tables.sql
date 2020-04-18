/* SEED DATA INTO CLIENTS TABLE */

INSERT INTO clients
    (id, name)
    VALUES
        (1, 'Rays Plumbing Services'),
        (2, 'Big Data Incorporated'),
        (3, 'Rogers Communication'),
        (4, 'NWTA Financing');

/* SEED DATA INTO CATEGORIES TABLE */

INSERT INTO categories
    (id, name)
    VALUES
        (1, 'Partial'),
        (2, 'Informed'),
        (3, 'Repeatable'),
        (4, 'Adaptive');

/* SEED DATA INTO SECURITYITEMS TABLE */

INSERT INTO securityitems
    (id, name, category)
    VALUES
        (1, 'Antivirus', 2),
        (2, 'Informed', 2),
        (3, 'Repeatable', 4),
        (4, 'Adaptive', 1);

/* SEED DATA INTO STATUS TABLE */

INSERT INTO status
    (id, status, clientid, securityitem)
    VALUES
        (1, FALSE, 1, 1),
        (2, FALSE, 1, 2),
        (3, TRUE, 1, 3),
        (4, TRUE, 1, 4),
        (5, FALSE, 2, 1),
        (6, FALSE, 2, 2),
        (7, TRUE, 2, 3),
        (8, TRUE, 2, 4),
        (9, FALSE, 3, 1),
        (10, FALSE, 3, 2),
        (11, TRUE, 3, 3),
        (12, TRUE, 3, 4),
        (13, FALSE, 4, 1),
        (14, FALSE, 4, 2),
        (15, TRUE, 4, 3),
        (16, TRUE, 4, 4);


