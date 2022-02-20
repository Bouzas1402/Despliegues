$TTL    604800
     IN      SOA     ns1.nyc3.carlosbouzas.es. admin.nyc3.carlosbouzas.es. (
                               3         ; Serial
                               604800         ; Refresh
                               86400         ; Retry
                               2419200         ; Expire
                               604800 )       ; Negative Cache TTL
; name servers - NS records
       IN      NS      ns1.nyc3.carlosbouzas.es.
       IN      NS      ns2.nyc3.carlosbouzas.es.
; name servers - A records
ns1.nyc3.carlosbouzas.es.       IN      A       172.21.0.4
ns2.nyc3.carlosbouzas.es.       IN      A       172.21.0.5
; 172.21.0.0/16 - A records
host1.nyc3.carlosbouzas.es.     IN      A       172.21.100.10
host2.nyc3.carlosbouzas.es.     IN      A       172.21.200.11
