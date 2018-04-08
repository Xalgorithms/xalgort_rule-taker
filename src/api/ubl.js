export default (invoice) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2" xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2" xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" xmlns:ccts="urn:oasis:names:specification:ubl:schema:xsd:CoreComponentParameters-2" xmlns:ext="urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2" xmlns:ns7="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2" xmlns:sdt="urn:oasis:names:specification:ubl:schema:xsd:SpecializedDatatypes-2" xmlns:udt="urn:un:unece:uncefact:data:specification:UnqualifiedDataTypesSchemaModule:2">
    <cbc:UBLVersionID>2.0</cbc:UBLVersionID>
    <cbc:ID></cbc:ID>
    <cbc:IssueDate>${invoice.envelope.issue_date}</cbc:IssueDate>
    <cbc:DocumentCurrencyCode>USD</cbc:DocumentCurrencyCode>
    <cac:AccountingSupplierParty>
      <cac:Party>
        <cac:PartyIdentification>
          <cbc:ID schemeID="TS:ID">5a8bb5df-89fb-4360-8f7e-f711ec846204</cbc:ID>
        </cac:PartyIdentification>
        <cac:PartyName>
          <cbc:Name>${invoice.envelope.seller_name}</cbc:Name>
        </cac:PartyName>
        <cac:PostalAddress>
          <cbc:AddressFormatCode listAgencyID="6" listID="UN/ECE 3477" listVersionID="D08B">5</cbc:AddressFormatCode>
          <cbc:StreetName>${invoice.envelope.seller_street}</cbc:StreetName>
          <cbc:BuildingNumber>${invoice.envelope.seller_building}</cbc:BuildingNumber>
          <cbc:CityName>${invoice.envelope.seller_region}</cbc:CityName>
          <cbc:PostalZone>${invoice.envelope.seller_postal_code}</cbc:PostalZone>
          <cbc:CountrySubentityCode>${invoice.envelope.seller_region}</cbc:CountrySubentityCode>
          <cac:Country>
            <cbc:IdentificationCode>${invoice.envelope.seller_country}</cbc:IdentificationCode>
          </cac:Country>
        </cac:PostalAddress>
        <cac:Person>
          <cbc:FirstName></cbc:FirstName>
          <cbc:FamilyName></cbc:FamilyName>
        </cac:Person>
        <cac:PhysicalLocation>
          <cac:Address>
            <cac:Country>
              <cbc:IdentificationCode listID="ISO 3116-1"></cbc:IdentificationCode>
            </cac:Country>
            <cbc:CountrySubentityCode listID="ISO 3116-2"></cbc:CountrySubentityCode>
          </cac:Address>
        </cac:PhysicalLocation>
      </cac:Party>
    </cac:AccountingSupplierParty>
    <cac:AccountingCustomerParty>
      <cac:Party>
        <cac:PartyIdentification>
          <cbc:ID schemeID="TS:ID"></cbc:ID>
        </cac:PartyIdentification>
        <cac:PartyName>
          <cbc:Name>${invoice.envelope.buyer_name}</cbc:Name>
        </cac:PartyName>
        <cac:PostalAddress>
          <cbc:AddressFormatCode listAgencyID="6" listID="UN/ECE 3477" listVersionID="D08B">5</cbc:AddressFormatCode>
          <cbc:StreetName>${invoice.envelope.buyer_street}</cbc:StreetName>
          <cbc:BuildingNumber>${invoice.envelope.buyer_building}</cbc:BuildingNumber>
          <cbc:CityName>${invoice.envelope.buyer_region}</cbc:CityName>
          <cbc:PostalZone>${invoice.envelope.buyer_postal_code}</cbc:PostalZone>
          <cbc:CountrySubentityCode>${invoice.envelope.buyer_region}</cbc:CountrySubentityCode>
          <cac:Country>
            <cbc:IdentificationCode>${invoice.envelope.buyer_country}</cbc:IdentificationCode>
          </cac:Country>
        </cac:PostalAddress>
        <cac:Contact></cac:Contact>
        <cac:PhysicalLocation>
          <cac:Address>
            <cac:Country>
              <cbc:IdentificationCode listID="ISO 3116-1"></cbc:IdentificationCode>
            </cac:Country>
            <cbc:CountrySubentityCode listID="ISO 3116-2"></cbc:CountrySubentityCode>
          </cac:Address>
        </cac:PhysicalLocation>
      </cac:Party>
    </cac:AccountingCustomerParty>
    <cac:InvoiceLine>
      <cbc:ID></cbc:ID>
      <cbc:InvoicedQuantity unitCode=""></cbc:InvoicedQuantity>
      <cbc:LineExtensionAmount currencyID=""></cbc:LineExtensionAmount>
      <cac:Item>
        <cbc:Description></cbc:Description>
        <cbc:Name></cbc:Name>
      </cac:Item>
      <cac:Price>
        <cbc:PriceAmount currencyID=""></cbc:PriceAmount>
        <cbc:BaseQuantity unitCode=""></cbc:BaseQuantity>
      </cac:Price>
    </cac:InvoiceLine>
  </Invoice>`
};