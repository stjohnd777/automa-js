## This is a generalized automa in javascript using three.js are the view. The classic automa is Conway Game of Live. As a first pass for clarity the Caonway automa is implemented in dimension two and three. The goals of this project is a visualization and abstraction upon automas.

* what role does topolgy play in the automa
* is the automa independent or not of the partiioning of space
* how do autom rules change over dimesion and topology

Simple topolies that will be consider are :

* flat infinit space, the plane, R3, ... RN
* flat space bounded, the sqaure, cube, ... Simple N
* Tourus Space T2, T3, ... TN
* Sperical Space, S1, S2, S3, ...., SN
* PRojective Plane RP2, RP3, ... RPN

Note any companct tow dimesional topolgy is derives from combinations of S2, T2, and RP2. This a deep result that will not be discussed. However this may be leveraged in time. 

This automa can be visualized in 1,2 and 3 dimension fathfully. Other techniques can be empoyed to visualize in higher dimesion such as graph. This becuase the essential mechanics of the evolution is based on neighborring "cell" and neighboring "entities"

Terms: "cell" of "simplex" is a spacial concept. In one two and three dimension the concept is clear, and it just a partitioning of space. In hight=er dimesions the concept is the same but some care needs to be applied to carry of ideas of what neighoring "cell" are and how "entities" mant trasition between cell. 


login
create a automa

an automa has topology, dimension, partition size
simplex-cube
simplex-cube has space-state
simplex-cube possition is static but state
an entity(s) can inhabitant a simplex-cube
entity has entity-state
entity can migrate to another simplex-cube

A(T,P,S(P),E1(S1),E2(S2), .... )

