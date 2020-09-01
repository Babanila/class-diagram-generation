## RULES

### ACEXRule

ACEX1: In a source code(text), the first noun following the word “AS” is an actor provided the noun is not made up with two or more words (compound noun).

ACEX2: If the first noun following “AS” is a proper name and is also followed by another noun, then the later noun is an actor.

ACEX3: The compound noun following “AS” is an actor.

ACEX4: For every compound noun, if the first noun in a compound noun is an adjective, the second noun is an actor. The relationship between the former and the later is inheritance relationships.

### CLEXRule

CLEX1: In a sentence, the subject is a class only if it is not a pronoun but a noun.

CLEX2: In a sentence, the direct object is a class.

CLEX3: The rule CLEX2 is applied but the direct object is part of a compound noun.

CLEX4: Every noun that comes before a possessive apostrophe is a class.

CLEX5: The noun that comes after preposition (of, for and to) is a class.

CLEX6: The nouns that are after, before or between conjunction(if, but, and etc.) is a noun between classes.

## RELPEXRule

RELPEX1: In a sentence, the "VERB" is the association between the subject and the direct object. Subject <- Verb -> direct object

RELPEX2: In the context, the verb is with a preposition (verb with preposition).
E.g How do you ask for a coffee in Deutsch?

RELPEX3: association created by prepositions such as "of, to, for and about".

RELPEX4: Association created by possessive cases such as " s' ", "my", "his", "her" etc.
Note: Correlation of pronouns with nouns to extract the associations using the coreference resolution of Stanford core NLP tool.

RELPEX5: Composition relationship exists with the following verbs which are "include, contain, comprise, have, part of etc.".

RELPEX6: Composition relationship exists between compound nouns, if both nouns are classes. // in code

RELPEX7: Aggregation relationship (participate) exists with verb that belongs to the list of verbs such as RELPEX5

RELPEX8: In a sentence, if the subject and the direct object are classes and the verb "to be" connects the two objects then inheritance relationships exist between them with the object as the parent class.

RELPEX9: Inheritance relationship exists in a sentence when words like "is kind of", "is a type of" etc.
